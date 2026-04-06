import { BrowserView, BrowserWindow, session } from "electron";

/**
 * ScrapeResult
 * Discogs のリリースページから抽出した価格情報を表す型。
 * - resourceId: 対象リリースの識別子（URL の一部）
 * - lowest / median / highest: 対象通貨に変換された数値、取得不可なら null
 */
type ScrapeResult = {
  // Discogs release identifier for the item being scraped
  resourceId: string;
  // lowest price (after applying rate conversion) or null if unavailable
  lowest: number | null;
  // median price (after applying rate conversion) or null if unavailable
  median: number | null;
  // highest price (after applying rate conversion) or null if unavailable
  highest: number | null;
  imgUrl?: string | null; // 追加: 画像 URL（存在する場合のみ）
  listingCount?: string | null; // 追加: 出品数（存在する場合のみ）
};

/**
 * Job
 * キューに入る単一スクレイピング対象の型
 * - resourceId: Discogs の release ページを特定する ID
 */
type Job = {
  resourceId: string;
};

/**
 * Queue
 * キューに格納するエントリ型。
 * - jobId: createJobInfo で生成された一意のジョブバッチ ID
 * - resolve: このジョブが完了したときに呼ばれる Promise の解決関数
 */
type Queue = {
  jobId: string;
  resolve: (value: ScrapeResult) => void;
};

/**
 * JobInfo
 * 1 つのスクレイピングバッチに関するメタデータを保持する型。
 * - successJobs: 完了したジョブの配列
 * - penddingJobs: 未処理（待機中）のジョブ配列（コード内プロパティ名は `penddingJobs`）
 * - penddingJobCount: バッチ内の総ジョブ数（開始時に penddingJobs.length と同値）
 * - rate: 取得した価格に掛ける換算率
 * - startDate / endDate: バッチ開始・終了時刻
 * - createdAt / updatedAt: 管理用タイムスタンプ
 *
 * 注意: 実装上プロパティ名に "pendding" が使われています（スペルミス）。型や外部 API に影響を与えない範囲で将来的に修正することを推奨します。
 */
type JobInfo = {
  successJobs: Job[];
  penddingJobs: Job[];
  penddingJobCount: number;
  rate: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
type JobInfoMap = Map<string, JobInfo>;

/**
 * JobStatus<T>
 * ジョブの状態を表すヘルパー型。ジェネリクスで状態を指定可能。
 * - "pendding"（待機中） / "success"（取得完了） / "inAcquisition"（取得中） / "error"
 *
 * 注意: 型パラメータに使う文字列はコード内の命名と合わせていますが、
 * コメント中は通常の英単語（pending, success, in-acquisition）で説明しています。
 */
type JobStatus<T> = T extends "pendding"
  ? { label: "待機中" } & Job
  : T extends "success"
    ? { label: "取得完了" } & Job
    : T extends "inAcquisition"
      ? { label: "取得中" }
      : "error";

/**
 * JobInfoApiResponse
 * 外部 API に返却する形式に整形した JobInfo。
 * - jobStatus: 各ジョブの一覧（ラベル付き）
 * - elapsedTime: 開始からの経過時間（秒）を文字列化したもの
 */
type JobInfoApiResponse = {
  jobId: string;
  jobStatus: JobStatus<"success" | "pendding" | "inAcquisition">[];
  penddingJobCount: number;
  successJobCount: number;
  rate: number;
  startDate: Date;
  endDate: Date | null;
  elapsedTime: string;
};

/**
 * ScrapeQueue クラス
 * - BrowserView のプールを使い並列スクレイピングを管理する非同期キュー
 * - BrowserView を再利用してメモリ・リソースの churn を抑える
 * - 完了ジョブ情報を一定数だけ保持し、古いものから prune する
 */
export default class ScrapeQueue {
  // BrowserView プール（再利用）
  private pool: BrowserView[] = [];
  // 実行待ちキュー（FIFO）
  private queue: Queue[] = [];
  // 現在実行中のジョブ数
  private running = 0;
  // プールサイズ（同時実行数の上限）
  private size: number;
  // pool に割り当てる隠しウィンドウ。show: false で UI 表示を抑える
  private win: BrowserWindow | null = null;
  // 成功ジョブ情報を保持する最大件数（古いものから削除）
  private MAX_SUCCESS_JOB_LIMIT: number = parseInt(
    process.env.REACT_APP_MAX_SUCCESS || "5",
  );
  // job 情報のマップ。将来 undefined にする必要がないなら型は Map のみで良い
  private jobInfos: JobInfoMap | undefined = new Map();

  constructor(size = 5) {
    this.size = size;
    console.log(`Initializing ScrapeQueue with pool size: ${size}`);
    // 隠しウィンドウを一つ作成し、そこに BrowserView をセットして使い回す
    this.win = this.createWindow();
    // プールを初期化（BrowserView を size 個生成）
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createView(this.win));
    }
  }

  /**
   * createWindow
   * - 表示しない（headless 風） BrowserWindow を生成
   * - 画像やスタイル等の不要リソースをブロックして帯域／レンダ負荷を軽減
   * - 全ての permission リクエストは無条件で拒否（このウィンドウは UI を表示しないため）
   * - navigator.webdriver を undefined に上書きして、簡易的なボット判定回避を試みる
   *
   * 注: 本関数ではセッション全体（session.defaultSession）に onBeforeRequest を登録しています。
   * アプリ内の他の web コンテンツにも影響を与える可能性があるため、必要に応じて
   * 別セッションを作成して割り当てる検討をおすすめします。
   */
  private createWindow(): BrowserWindow {
    // 読み込みをキャンセルするリソース種別を指定して軽量化
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
      const blocked = ["image", "stylesheet", "font", "media"];
      if (blocked.includes(details.resourceType)) {
        // キャンセルしてリソースを取得しない
        callback({ cancel: true });
      } else {
        callback({ cancel: false });
      }
    });

    const win = new BrowserWindow({
      show: false, // 表示しない（バックグラウンドで動作）
      webPreferences: {
        backgroundThrottling: false, // バックグラウンドでも throttling しない
      },
    });

    // permission 要求は不要なので無条件拒否にする（セキュリティ上も安全）
    win.webContents.session.setPermissionRequestHandler(() => false);

    // headless っぽさを減らすため navigator.webdriver を undefined にする試み
    // （ページ側のボット検出を完全に回避するものではありません）
    win.webContents.executeJavaScript(
      `Object.defineProperty(navigator, 'webdriver', {get: () => undefined})`,
    );
    return win;
  }

  /**
   * createView
   * - BrowserView を生成して隠しウィンドウにセットして返す
   * - 生成した view は pool で再利用する想定
   */
  private createView(win: BrowserWindow) {
    const view = new BrowserView();
    win.setBrowserView(view);
    return view;
  }

  /**
   * createJobInfo
   * - 新しいバッチ（jobId）を作成して jobInfos に登録する
   * - penddingJobs（コード上のプロパティ名は `penddingJobs`）には resourceIds のコピーを格納
   * - 返却値は受け取った jobId をそのまま返す（API の都合でこの形）
   */
  public createJobInfo(
    rate: number,
    resourceIds: string[],
    jobId: string,
  ): string {
    const jobInfo: JobInfo = {
      successJobs: [],
      // penddingJobs は最初 resourceIds 全体をコピー（待機中リスト）
      penddingJobs: resourceIds.map((id) => ({ resourceId: id })),
      rate,
      penddingJobCount: resourceIds.length,
      startDate: new Date(),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobInfos?.set(jobId, jobInfo);
    console.log(`Created job info:`, jobInfo);
    return jobId;
  }

  /**
   * refreshJobInfos
   * - 1 件ジョブが完了したときに呼び、JobInfo を更新する
   * - 全ジョブが完了したら endDate を設定し、古い JobInfo を prune（削除）する
   *
   * prune ロジック:
   * - jobInfos のキー一覧を取得し、保存件数が MAX_SUCCESS_JOB_LIMIT 以上なら
   *   古いキー（配列先頭）を削除するシンプルな実装。
   * - 注意: 並列性や順序保証が必要ならより堅牢な実装（LRU 等）を検討してください。
   */
  private refreshJobInfos(jobId: string, resourceId: string) {
    console.log(
      `Refreshing job info for jobId ${jobId} and resourceId ${resourceId}`,
    );
    const jobInfo = this.jobInfos?.get(jobId);
    if (!jobInfo) return;

    jobInfo.successJobs.push({ resourceId });
    jobInfo.updatedAt = new Date();

    // すべてのジョブが完了したかチェック
    if (jobInfo.successJobs.length === jobInfo.penddingJobCount) {
      jobInfo.endDate = new Date();
      // 保持上限を超えていれば古いものを削除する（FIFO）
      const keys = Array.from(this.jobInfos!.keys());
      if (keys.length > this.MAX_SUCCESS_JOB_LIMIT) {
        this.jobInfos?.delete(keys[0]);
      }
    }
  }

  /**
   * scrape
   * - 外部からキューにジョブを登録するためのメソッド
   * - Promise を返し、内部でその resolve 関数を保存してジョブ完了時に呼ぶ
   */
  scrape(jobId: string): Promise<ScrapeResult> {
    return new Promise((resolve) => {
      this.queue.push({ jobId, resolve });
      this.next();
    });
  }

  /**
   * getJobInfo
   * - 単一のバッチの情報を API レスポンス形式で取得するヘルパー
   */
  public getJobInfo(jobId: string): JobInfoApiResponse | null {
    const info = this.jobInfos?.get(jobId);
    if (!info) return null;
    return this.toApiResponse(jobId, info);
  }

  /**
   * getJobInfos
   * - 保持しているすべての JobInfo を API レスポンス形式に整形して返す
   */
  public getJobInfos(): JobInfoApiResponse[] {
    return Array.from(this.jobInfos!.entries()).map(([key, info]) =>
      this.toApiResponse(key!, info!),
    );
  }

  /**
   * toApiResponse
   * - 内部の JobInfo を外部 API 用の構造（JobInfoApiResponse）に変換する共通ロジック
   * - jobStatus 配列は「取得完了」「取得中」「待機中」の順で返す
   */
  private toApiResponse(jobId: string, info: JobInfo): JobInfoApiResponse {
    const sucessJobStatus: JobStatus<"success">[] = [];
    const pendingJobStatus: JobStatus<"pendding">[] = [];
    const inAcquisitionJobStatus: JobStatus<"inAcquisition">[] = [];

    for (const job of info.successJobs) {
      sucessJobStatus.push({ label: "取得完了", ...job });
    }
    for (const job of info.penddingJobs) {
      pendingJobStatus.push({ label: "待機中", ...job });
    }

    // penddingJobCount（総数）から success + pending の数を引いて、
    // 残りを「取得中」と見なして補完する（数を合わせるためのループ）
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
      jobId: jobId,
      jobStatus: [
        ...sucessJobStatus,
        ...inAcquisitionJobStatus,
        ...pendingJobStatus,
      ],
      penddingJobCount: info.penddingJobCount,
      successJobCount: info.successJobs.length,
      rate: info.rate,
      startDate: info.startDate,
      endDate: info.endDate,
      elapsedTime: info.endDate
        ? `${Math.round((info.endDate.getTime() - info.startDate.getTime()) / 1000)}秒`
        : `${Math.round((new Date().getTime() - info.startDate.getTime()) / 1000)}秒`,
    };
  }

  /**
   * next
   * - キューから次のジョブを取り出して実行するコア処理
   * - 同時実行数が this.size を超えないように制御
   * - BrowserView はプールから pop して使用後に push で戻す（再利用）
   *
   * 流れ:
   * 1. running >= size なら何もしない（上限）
   * 2. キューが空なら何もしない
   * 3. queue から 1 件取り出し、対応する JobInfo の penddingJobs から 1 件を shift
   * 4. BrowserView をプールから借り、ページ読み込み → DOM 抽出スクリプト実行
   * 5. 結果を解析して resolve を呼び、jobInfos を更新、BrowserView を返却
   * 6. queue に残りがあれば再帰的に next() を呼ぶ
   *
   * 注意点:
   * - view.webContents.loadURL / executeJavaScript が例外を投げた場合でも
   *   queue.resolve を必ず呼んでいる（呼び出し元は null を受け取り処理する想定）
   * - BrowserView の数がプールより多い／少ないケースや、view が破棄された場合
   *   の保護（null チェックや例外処理の強化）が必要であれば追加実装を推奨
   */
  private async next() {
    // 同時実行数が上限に達していたら何もしない
    if (this.running >= this.size) return;
    // キューが空なら終了
    if (this.queue.length === 0) return;

    // FIFO で 1 件取り出す
    const queue = this.queue.shift()!;
    const jobInfo = this.jobInfos?.get(queue.jobId)!;
    const job = jobInfo.penddingJobs.shift()!; // 実際にスクレイプするリソース ID

    // 実行カウントを増やす
    this.running++;

    // プールから BrowserView を借りる（存在しない場合はエラーになるため前提として十分な数を用意する）
    const view = this.pool.pop()!;
    let result: ScrapeResult = {
      resourceId: job.resourceId,
      lowest: null,
      median: null,
      highest: null,
      imgUrl: null,
      listingCount: null,
    };

    try {
      this.win?.setBrowserView(view);
      // 対象ページへ移動
      await view.webContents.loadURL(
        `https://www.discogs.com/sell/release/${job.resourceId}`,
      );

      // ページ内から統計情報を抽出する簡易スクリプトを実行
      // -> DOM 構造が変わると取得できなくなるため、取得箇所の堅牢化やフォールバックを検討してください
      const { text, imgUrl, listingCount } = await view.webContents
        .executeJavaScript(`

        (()=>{
          const imgEl = document.querySelector(".image_gallery.image_gallery_large");
          const data = imgEl?.getAttribute("data-images");

          const images = data ? JSON.parse(data) : [];

          // サムネ
          const imgUrl = images[0]?.thumb;

          const listingCountEl = document.querySelector('.pagination_total');
          let listingCountText = listingCountEl ? listingCountEl.textContent : null;

          // 全角→半角
          listingCountText = listingCountText.replace(/[！-～]/g, s =>
            String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
          )
          // ゼロ幅文字削除
          .replace(/[\u200B-\u200D\uFEFF]/g, '')
          // 空白正規化
          .replace(/\s+/g, ' ');

          // 空白正規化
          listingCountText = listingCountText.replace(/\s+/g, ' ');

          // ダッシュ統一
          listingCountText = listingCountText.replace(/[–—]/g, '-');

          let match = listingCountText.match(/-(?:\s| )+(.+)/);
          match = match[1].trim().split(' ');
          const listingCount = match ? Number(match[0]) : null;

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

          return {text, imgUrl, listingCount};

        })()

      `);

      // 取得文字列から数値部分のみ抽出して換算率を適用
      result = {
        resourceId: job.resourceId,
        lowest: text.lowest
          ? Math.round(
              parseFloat(text.lowest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        median: text.median
          ? Math.round(
              parseFloat(text.median.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        highest: text.highest
          ? Math.round(
              parseFloat(text.highest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        imgUrl: imgUrl ?? null,
        listingCount: listingCount ?? null,
      };
      // 正常取得時のログと Promise 解決
      console.log(`Scraped resourceId ${job.resourceId}:`, result);
      queue.resolve(result);
    } catch (e) {
      // ネットワークエラーや DOM 取得失敗時のフォールバック
      console.error(`Error scraping resourceId ${job.resourceId}:`, e);
      // 呼び出し元は null のフィールドを受け取り適切に扱う想定
      queue.resolve(result);
    }

    // バッチメタ情報を更新
    this.refreshJobInfos(queue.jobId, result.resourceId);
    await view.webContents.loadURL("about:blank");
    // 使用した BrowserView をプールに戻して再利用可能にする
    this.pool.push(view);
    this.win?.setBrowserView(null);
    this.running--;

    // キューに残りがあれば続けて処理（再帰）
    this.next();
  }
}
