import { app, BrowserView, BrowserWindow, session } from "electron";
import { v4 as uuidv4 } from "uuid";
type ScrapeResult = {
  resourceId: string;
  lowest: number | null;
  median: number | null;
  highest: number | null;
};

type Job = {
  resourceId: string;
};
type Queue = {
  jobId: string;
  resolve: (value: ScrapeResult) => void;
};
type JobInfo = {
  jobId: string;
  successJobs: Job[];
  penddingJobs: Job[];
  penddingJobCount: number;
  rate: number;
  startDate: Date;
  endDate: Date | null;
};

export default class ScrapeQueue {
  private pool: BrowserView[] = [];
  private queue: Queue[] = [];
  private running = 0;
  private size: number;
  private win: BrowserWindow | null = null;
  private maxSuccessJobInfo: number = 5;
  private jobInfos: JobInfo[] = [];
  private jobInfoIndex: Record<string, { index: number }> = {};

  constructor(size = 5) {
    this.size = size;
    console.log(`Initializing ScrapeQueue with pool size: ${size}`);
    this.win = this.createWindow();
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createView(this.win));
    }
  }

  private createWindow(): BrowserWindow {
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
    win.webContents.session.setPermissionRequestHandler(() => false);
    win.webContents.executeJavaScript(
      `Object.defineProperty(navigator, 'webdriver', {get: () => undefined})`,
    );
    return win;
  }
  private createView(win: BrowserWindow) {
    const view = new BrowserView();

    win.setBrowserView(view);

    return view;
  }
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
  private refreshJobInfos(jobId: string, resourceId: string) {
    console.log(
      `Refreshing job info for jobId ${jobId} and resourceId ${resourceId}`,
    );
    const jobInfo = this.jobInfos[this.jobInfoIndex[jobId].index];
    jobInfo.successJobs.push({ resourceId });
    console.log(this.jobInfos);

    if (jobInfo.successJobs.length === jobInfo.penddingJobCount) {
      jobInfo.endDate = new Date();
      this.jobInfos.lastIndexOf(jobInfo);
      if (this.jobInfos.length >= this.maxSuccessJobInfo) {
        const lastIndex = this.jobInfos.lastIndexOf(undefined as any);
        console.log(`Removing job info at index ${lastIndex}`);
        this.jobInfos[lastIndex >= 0 ? lastIndex + 1 : 0] = undefined as any;
        delete this.jobInfoIndex[jobId];
      }
    }
  }

  scrape(jobId: string): Promise<ScrapeResult> {
    return new Promise((resolve) => {
      this.queue.push({ jobId, resolve });
      this.next();
    });
  }

  private async next() {
    if (this.running >= this.size) return;
    if (this.queue.length === 0) return;
    const queue = this.queue.shift()!;
    const jobInfo = this.jobInfos[this.jobInfoIndex[queue.jobId].index];
    const job = jobInfo.penddingJobs.shift()!;

    this.running++;

    const view = this.pool.pop()!;

    try {
      await view.webContents.loadURL(
        `https://www.discogs.com/sell/release/${job.resourceId}`,
      );
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

      const result: ScrapeResult = {
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
      };
      console.log(`Scraped resourceId ${job.resourceId}:`, result);
      queue.resolve(result);
    } catch (e) {
      console.error(`Error scraping resourceId ${job.resourceId}:`, e);
      queue.resolve({
        resourceId: job.resourceId,
        lowest: null,
        median: null,
        highest: null,
      });
    }
    this.refreshJobInfos(queue.jobId, job.resourceId);
    this.pool.push(view);
    this.running--;

    this.next();
  }
}
