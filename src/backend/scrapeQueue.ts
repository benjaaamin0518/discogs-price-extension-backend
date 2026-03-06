import { BrowserWindow } from "electron";

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
  private pool: BrowserWindow[] = [];
  private queue: Job[] = [];
  private running = 0;
  private size: number;

  constructor(size = 5) {
    this.size = size;

    for (let i = 0; i < size; i++) {
      this.pool.push(this.createWindow());
    }
  }

  private createWindow(): BrowserWindow {
    const win = new BrowserWindow({
      show: false,
    });

    return win;
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

    const win = this.pool.pop()!;

    try {
      await win.loadURL(
        `https://www.discogs.com/sell/release/${job.resourceId}`,
      );

      const text = await win.webContents.executeJavaScript(`

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

    this.pool.push(win);
    this.running--;

    this.next();
  }
}
