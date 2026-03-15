import { app, BrowserView, BrowserWindow, session } from "electron";
import { v4 as uuidv4 } from "uuid";

// ScrapeResult describes the price information extracted from a single Discogs
// release page.  Prices are converted using the provided rate and may be `null`
// if the value could not be determined (for example if the page layout changed
// or the request failed).
//
// `resourceId` is the Discogs release identifier used in the URL, and the
// other three fields correspond to the lowest, median and highest prices found.
// They are stored as numbers in the target currency or `null` when unavailable.

type ScrapeResult = {
  // Discogs release identifier for the item being scraped
  resourceId: string;
  // lowest price (after applying rate conversion) or null if unavailable
  lowest: number | null;
  // median price (after applying rate conversion) or null if unavailable
  median: number | null;
  // highest price (after applying rate conversion) or null if unavailable
  highest: number | null;
};

// ジョブとしてキューに入る単一のスクレイピング対象
// `resourceId` は Discogs のリリースページを示す識別子

// スクレイピングジョブのデータ型
type Job = {
  resourceId: string;
};

// キューに格納されるエントリの型。
// `jobId` は createJobInfo で生成された一意の識別子で、
// Promise の解決関数 `resolve` が付属する。
// enqueue されたとき resolve が呼ばれ結果が返却される。

type Queue = {
  jobId: string;
  resolve: (value: ScrapeResult) => void;
};

// 1つのスクレイピングバッチに関するメタデータを保持する型。
// このインスタンスがキューに入るとジョブごとに結果が集まっていく。
//
// - `successJobs` : 完了したジョブのリスト
// - `penddingJobs`: まだ実行されていないジョブのリスト
// - `penddingJobCount`: バッチ内の総ジョブ数（開始時に penddingJobs.length と同じ）

// ジョブ情報の詳細なデータ型
type JobInfo = {
  jobId: string;
  successJobs: ScrapeResult[];
  penddingJobs: Job[];
  penddingJobCount: number;
  rate: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// ジョブの状態を表現するヘルパー型。
// ジェネリクスを使って特定の状態を表したり、readonly タイプを生成
// 出来るようにしている。API 応答用にラベル付きの変種として
// 利用される。

type JobStatus<T> = T extends "pendding"
  ? { label: "待機中" } & Job
  : T extends "success"
    ? { label: "取得完了" } & Job
    : T extends "inAcquisition"
      ? { label: "取得中" }
      : "error";
// 外部 API に返却するために整形されたジョブ情報。
// 内部の JobInfo とほぼ同じだが、状態一覧や経過時間の文字列を含む。
// elapsedTime は現在時刻または endDate から計算される。

// ジョブ情報の詳細なデータ型
type JobInfoApiResponse = {
  jobId: string;
  jobStatus: JobStatus<"success" | "pendding" | "inAcquisition">[];
  penddingJobCount: number;
  successJobCount: number;
  successJobs: ScrapeResult[];
  rate: number;
  startDate: Date;
  endDate: Date | null;
  elapsedTime: string;
};

/**
 * ScrapeQueueクラス
 * Discogs価格情報をスクレイピングするための非同期キューを管理します
 * BrowserViewのプールを使用して複数のリクエストを効率的に処理します
 */
export default class ScrapeQueue {
  private pool: BrowserView[] = [];
  private queue: Queue[] = [];
  private running = 0;
  private size: number;
  private win: BrowserWindow | null = null;
  private MAX_SUCCESS_JOB_LIMIT: number = parseInt(
    process.env.REACT_APP_MAX_SUCCESS || "5",
  ); // 保持する完了ジョブ情報の最大数
  private CLEANUP_INTERVAL_MS = parseInt(
    process.env.REACT_APP_CLEANUP_INTERVAL_MS || "600000",
  );
  private COMPLETED_TTL_MS = parseInt(
    process.env.REACT_APP_COMPLETED_TTL_MS || "600000",
  );
  // NOTE: 環境変数の名前ミスの可能性があるので必要なら修正を検討してください
  private JOB_RETENTION_MS = parseInt(
    process.env.REACT_APP_COMPLETED_TTL_MS || "600000",
  );
  private jobInfos: (JobInfo | undefined)[] = []; // undefined を許す配列に
  private jobInfoIndex: Record<string, { index: number }> = {}; // ジョブIDからインデックスへのマッピング

  constructor(size = 5) {
    this.size = size;
    console.log(`Initializing ScrapeQueue with pool size: ${size}`);
    this.win = this.createWindow();
    // 指定されたサイズのBrowserViewプールを初期化
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createView(this.win));
    }
    // this を正しく束縛する
    setInterval(() => this.cleanupJobs(), this.CLEANUP_INTERVAL_MS);
  }
  /**
   * 隠しウィンドウを作成
   * 画像やスタイルシートの読込をブロックして性能を最適化
   */
  private createWindow(): BrowserWindow {
    // 不要なリソースタイプをブロック
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
      const blocked = ["image", "stylesheet", "font", "media"];
      if (blocked.includes(details.resourceType)) {
        callback({ cancel: true });
      } else {
        callback({ cancel: false });
      }
    });
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        backgroundThrottling: false,
      },
    });
    // 全てのパーミッションリクエストを無条件に拒否する。
    // このウィンドウは開かれないため、許可を求められることは不要。
    win.webContents.session.setPermissionRequestHandler(() => false);

    // Discogs 側のボット検出を回避するため、webdriver フラグを
    // undefined にしてヘッドレス環境を隠蔽する。
    win.webContents.executeJavaScript(
      `Object.defineProperty(navigator, 'webdriver', {get: () => undefined})`,
    );
    return win;
  }
  /**
   * BrowserViewを作成して指定されたウィンドウに設定
   */
  private createView(win: BrowserWindow) {
    const view = new BrowserView();

    win.setBrowserView(view);

    return view;
  }
  public createJobInfo(rate: number, resourceIds: string[]): JobInfo {
    const jobInfo: JobInfo = {
      jobId: uuidv4(),
      successJobs: [],
      // penddingJobs は最初 resourceIds 全体をコピー
      penddingJobs: resourceIds.map((id) => ({ resourceId: id })),
      rate,
      penddingJobCount: resourceIds.length,
      startDate: new Date(),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // 配列へ追加し、インデックスを保持（後で高速検索に使用）
    const index = this.jobInfos.push(jobInfo);
    this.jobInfoIndex[jobInfo.jobId] = {
      index: index - 1,
    };
    console.log(`Created job info:`, jobInfo);
    return jobInfo;
  }

  private refreshJobInfos(jobId: string, result: ScrapeResult) {
    console.log(
      `Refreshing job info for jobId ${jobId} and resourceId ${result.resourceId}`,
    );
    const idx = this.jobInfoIndex[jobId];
    if (!idx) {
      console.warn(`Unknown jobId ${jobId} in refreshJobInfos`);
      return;
    }
    const jobInfo = this.jobInfos[idx.index];
    if (!jobInfo) return;

    jobInfo.successJobs.push(result);
    jobInfo.updatedAt = new Date();

    // すべてのジョブが完了したかチェック
    if (jobInfo.successJobs.length === jobInfo.penddingJobCount) {
      jobInfo.endDate = new Date();
      // prune ロジックは保持（必要なら改善）
      const lastSuccessIndex = this.jobInfos.lastIndexOf(jobInfo);
      if (lastSuccessIndex >= this.MAX_SUCCESS_JOB_LIMIT) {
        const lastIndex = this.jobInfos.lastIndexOf(undefined as any);
        console.log(`Removing job info at index ${lastIndex}`);
        this.jobInfos[lastIndex >= 0 ? lastIndex + 1 : 0] = undefined as any;
        delete this.jobInfoIndex[jobId];
      }
    }
  }

  private cleanupJobs() {
    const now = new Date();
    for (let i = 0; i < this.jobInfos.length; i++) {
      const job = this.jobInfos[i];
      if (!job) continue;
      const age = now.getTime() - job.createdAt.getTime();

      if (job.successJobs.length === job.penddingJobCount) {
        if (now.getTime() - job.updatedAt.getTime() > this.COMPLETED_TTL_MS) {
          this.jobInfos[this.jobInfoIndex[job.jobId].index] = undefined as any;
          delete this.jobInfoIndex[job.jobId];
          continue;
        }
      }
      // general TTL
      if (age > this.JOB_RETENTION_MS) {
        this.jobInfos[this.jobInfoIndex[job.jobId].index] = undefined as any;
        delete this.jobInfoIndex[job.jobId];
      }
    }
  }

  // queue への登録はそのまま
  scrape(jobId: string): Promise<ScrapeResult> {
    return new Promise((resolve) => {
      this.queue.push({ jobId, resolve });
      this.next();
    });
  }

  /**
   * 単一ジョブを API 出力フォーマットで取得するユーティリティ
   */
  public getJobInfo(jobId: string): JobInfoApiResponse | null {
    const idx = this.jobInfoIndex[jobId];
    if (!idx) return null;
    const info = this.jobInfos[idx.index];
    if (!info) return null;
    return this.toApiResponse(info);
  }

  /**
   * 既存の getJobInfos を内部ユーティリティ toApiResponse でクリアに
   */
  public getJobInfos(): JobInfoApiResponse[] {
    return this.jobInfos
      .filter((info) => info !== undefined)
      .map((info) => this.toApiResponse(info!));
  }

  /**
   * JobInfo -> JobInfoApiResponse に変換する共通ロジック（重複回避）
   */
  private toApiResponse(info: JobInfo): JobInfoApiResponse {
    const sucessJobStatus: JobStatus<"success">[] = [];
    const pendingJobStatus: JobStatus<"pendding">[] = [];
    const inAcquisitionJobStatus: JobStatus<"inAcquisition">[] = [];

    for (const job of info.successJobs) {
      sucessJobStatus.push({ label: "取得完了", ...job });
    }
    for (const job of info.penddingJobs) {
      pendingJobStatus.push({ label: "待機中", ...job });
    }

    let isInAcquisition =
      info.penddingJobCount -
        (sucessJobStatus.length + pendingJobStatus.length) !==
      0;
    while (isInAcquisition) {
      inAcquisitionJobStatus.push({ label: "取得中" });
      isInAcquisition =
        info.penddingJobCount -
          (sucessJobStatus.length +
            pendingJobStatus.length +
            inAcquisitionJobStatus.length) !==
        0;
    }

    return {
      jobId: info.jobId,
      jobStatus: [
        ...sucessJobStatus,
        ...inAcquisitionJobStatus,
        ...pendingJobStatus,
      ],
      penddingJobCount: info.penddingJobCount,
      successJobCount: info.successJobs.length,
      successJobs: info.successJobs,
      rate: info.rate,
      startDate: info.startDate,
      endDate: info.endDate,
      elapsedTime: info.endDate
        ? `${Math.round((info.endDate.getTime() - info.startDate.getTime()) / 1000)}秒`
        : `${Math.round((new Date().getTime() - info.startDate.getTime()) / 1000)}秒`,
    };
  }
  /**
   * キューから次のジョブを取得して実行
   * プール内で利用可能なBrowserViewがある場合のみ実行
   */
  private async next() {
    // プール内で同時に処理できる数を超えていれば何もしない
    if (this.running >= this.size) return;
    // そもそもキューが空だったら終了
    if (this.queue.length === 0) return;

    // キューから1件取り出す
    const queue = this.queue.shift()!;
    const jobInfo = this.jobInfos[this.jobInfoIndex[queue.jobId].index]!;
    const job = jobInfo.penddingJobs.shift()!; // 実際のリソースID

    // 同時実行カウントを増やす
    this.running++;

    // 使用可能な BrowserView をプールから借りる
    const view = this.pool.pop()!;
    let result: ScrapeResult = {
      resourceId: job.resourceId,
      lowest: null,
      median: null,
      highest: null,
    };

    try {
      // 対象ページに移動
      await view.webContents.loadURL(
        `https://www.discogs.com/sell/release/${job.resourceId}`,
      );

      // DOM から統計情報を引き抜くスクリプトを実行
      const text = await view.webContents.executeJavaScript(`

        (()=>{

          const el = document.querySelector("#statistics ul.last")
          const lis = el.querySelectorAll("li")

          let text = {lowest:"",median:"",highest:""}

          lis.forEach((li,i)=>{

            if(i>=1 && i<=3){

              const span = li.querySelector("span")
              if(span) span.remove()

              if(i===1) text.lowest = li.textContent.trim()
              if(i===2) text.median = li.textContent.trim()
              if(i===3) text.highest = li.textContent.trim()

            }

          })

          return text

        })()

      `);

      // スクレイピング結果を解析して価格を抽出
      result = {
        resourceId: job.resourceId,
        // 数字部分だけ抜き出し換算率をかける
        lowest: text.lowest
          ? Math.round(
              parseFloat(text.lowest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        // 同じく中央値
        median: text.median
          ? Math.round(
              parseFloat(text.median.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        // 最高値
        highest: text.highest
          ? Math.round(
              parseFloat(text.highest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
      };
      // 正常に取得できた場合はログを残して Promise を解決
      console.log(`Scraped resourceId ${job.resourceId}:`, result);
      queue.resolve(result);
    } catch (e) {
      // ページ構造が変わったりネットワークエラーが発生した場合など
      // ここに到達する。呼び出し元は null 値を受け取って処理する。
      console.error(`Error scraping resourceId ${job.resourceId}:`, e);
      queue.resolve(result);
    }
    // 完了したジョブをバッチのメタ情報に反映する
    this.refreshJobInfos(queue.jobId, result);
    console.log(this.getJobInfos());
    // 使用していた BrowserView を返却して別ジョブに使えるようにする
    this.pool.push(view);
    this.running--;

    // まだキューに残りがあれば再帰的に処理を続ける
    this.next();
  }
}
