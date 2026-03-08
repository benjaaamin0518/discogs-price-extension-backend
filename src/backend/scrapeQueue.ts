import { app, BrowserView, BrowserWindow, session } from "electron";

type ScrapeResult = {
  resourceId: string;
  lowest: number | null;
  median: number | null;
  highest: number | null;
};

type Job = {
  resourceId: string;
  rate: number;
  resolve: (value: ScrapeResult) => void;
};

export default class ScrapeQueue {
  private pool: BrowserView[] = [];
  private queue: Job[] = [];
  private running = 0;
  private size: number;
  private win: BrowserWindow | null = null;

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

  scrape(resourceId: string, rate: number): Promise<ScrapeResult> {
    return new Promise((resolve) => {
      this.queue.push({ resourceId, rate, resolve });
      this.next();
    });
  }

  private async next() {
    if (this.running >= this.size) return;
    if (this.queue.length === 0) return;

    const job = this.queue.shift()!;
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
              parseFloat(text.lowest.replace(/[^0-9.]/g, "")) * job.rate,
            )
          : null,

        median: text.median
          ? Math.round(
              parseFloat(text.median.replace(/[^0-9.]/g, "")) * job.rate,
            )
          : null,

        highest: text.highest
          ? Math.round(
              parseFloat(text.highest.replace(/[^0-9.]/g, "")) * job.rate,
            )
          : null,
      };
      console.log(`Scraped resourceId ${job.resourceId}:`, result);
      job.resolve(result);
    } catch (e) {
      console.error(`Error scraping resourceId ${job.resourceId}:`, e);
      job.resolve({
        resourceId: job.resourceId,
        lowest: null,
        median: null,
        highest: null,
      });
    }

    this.pool.push(view);
    this.running--;

    this.next();
  }
}
