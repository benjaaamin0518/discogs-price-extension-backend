import { app, BrowserView, BrowserWindow, session } from "electron";
import { v4 as uuidv4 } from "uuid";

// スクレイピング結果のデータ型
type ScrapeResult = {
  resourceId: string;
  lowest: number | null;
  median: number | null;
  highest: number | null;
};

// スクレイピングジョブのデータ型
type Job = {
  resourceId: string;
};

// キュー内のアイテムのデータ型
type Queue = {
  jobId: string;
  resolve: (value: ScrapeResult) => void;
};

// ジョブ情報の詳細なデータ型
type JobInfo = {
  jobId: string;
  successJobs: Job[];
  penddingJobs: Job[];
  penddingJobCount: number;
  rate: number;
  startDate: Date;
  endDate: Date | null;
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
  private maxSuccessJobInfo: number = 5; // 保持する完了ジョブ情報の最大数
  private jobInfos: JobInfo[] = []; // ジョブ情報の履歴
  private jobInfoIndex: Record<string, { index: number }> = {}; // ジョブIDからインデックスへのマッピング

  /**
   * コンストラクタ
   * @param size - BrowserViewプールのサイズ（デフォルト: 5）
   */
  constructor(size = 5) {
    this.size = size;
    console.log(`Initializing ScrapeQueue with pool size: ${size}`);
    this.win = this.createWindow();
    // 指定されたサイズのBrowserViewプールを初期化
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createView(this.win));
    }
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
    // パーミッション要求を拒否
    win.webContents.session.setPermissionRequestHandler(() => false);
    // webdriverプロパティを非表示にしてボット検出を回避
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

  /**
   * 新しいジョブ情報を作成
   * @param rate - 価格の換算率
   * @param resourceIds - スクレイピング対象のリソースIDの配列
   * @returns 作成されたジョブ情報
   */
  public createJobInfo(rate: number, resourceIds: string[]): JobInfo {
    const jobInfo: JobInfo = {
      jobId: uuidv4(),
      successJobs: [],
      penddingJobs: resourceIds.map((id) => ({ resourceId: id })),
      rate,
      penddingJobCount: resourceIds.length,
      startDate: new Date(),
      endDate: null,
    };
    const index = this.jobInfos.push(jobInfo);
    this.jobInfoIndex[jobInfo.jobId] = {
      index: index - 1,
    };
    console.log(`Created job info:`, jobInfo);
    return jobInfo;
  }

  /**
   * ジョブ情報を更新し、完了状態を確認
   * @param jobId - 更新するジョブID
   * @param resourceId - 完了したリソースID
   */
  private refreshJobInfos(jobId: string, resourceId: string) {
    console.log(
      `Refreshing job info for jobId ${jobId} and resourceId ${resourceId}`,
    );
    const jobInfo = this.jobInfos[this.jobInfoIndex[jobId].index];
    // 完了したジョブをリストに追加
    jobInfo.successJobs.push({ resourceId });
    console.log(this.jobInfos);

    // すべてのジョブが完了したか確認
    if (jobInfo.successJobs.length === jobInfo.penddingJobCount) {
      jobInfo.endDate = new Date();
      this.jobInfos.lastIndexOf(jobInfo);
      // 古いジョブ情報を削除してメモリを節約
      if (this.jobInfos.length >= this.maxSuccessJobInfo) {
        const lastIndex = this.jobInfos.lastIndexOf(undefined as any);
        console.log(`Removing job info at index ${lastIndex}`);
        this.jobInfos[lastIndex >= 0 ? lastIndex + 1 : 0] = undefined as any;
        delete this.jobInfoIndex[jobId];
      }
    }
  }

  /**
   * スクレイピングをキューに追加
   * @param jobId - ジョブID
   * @returns スクレイピング結果のPromise
   */
  scrape(jobId: string): Promise<ScrapeResult> {
    return new Promise((resolve) => {
      this.queue.push({ jobId, resolve });
      this.next();
    });
  }

  /**
   * キューから次のジョブを取得して実行
   * プール内で利用可能なBrowserViewがある場合のみ実行
   */
  private async next() {
    // 同時実行数がプールサイズに達している場合は待機
    if (this.running >= this.size) return;
    // キューが空の場合は終了
    if (this.queue.length === 0) return;
    const queue = this.queue.shift()!;
    const jobInfo = this.jobInfos[this.jobInfoIndex[queue.jobId].index];
    const job = jobInfo.penddingJobs.shift()!;

    this.running++;

    // プールからBrowserViewを取得
    const view = this.pool.pop()!;

    try {
      // Discogs販売ページにアクセス
      await view.webContents.loadURL(
        `https://www.discogs.com/sell/release/${job.resourceId}`,
      );
      // ページから統計情報を抽出
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
      const result: ScrapeResult = {
        resourceId: job.resourceId,
        // 数値を抽出して換算率を適用
        lowest: text.lowest
          ? Math.round(
              parseFloat(text.lowest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        // 中央値の計算
        median: text.median
          ? Math.round(
              parseFloat(text.median.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
        // 最高値の計算
        highest: text.highest
          ? Math.round(
              parseFloat(text.highest.replace(/[^0-9.]/g, "")) * jobInfo.rate,
            )
          : null,
      };
      console.log(`Scraped resourceId ${job.resourceId}:`, result);
      queue.resolve(result);
    } catch (e) {
      // スクレイピング失敗時はnullで返す
      console.error(`Error scraping resourceId ${job.resourceId}:`, e);
      queue.resolve({
        resourceId: job.resourceId,
        lowest: null,
        median: null,
        highest: null,
      });
    }
    // ジョブ完了情報を記録
    this.refreshJobInfos(queue.jobId, job.resourceId);
    // BrowserViewをプールに戻す
    this.pool.push(view);
    this.running--;

    // 次のジョブを処理
    this.next();
  }
}
