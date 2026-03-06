import { chromium } from "playwright-extra";

export class PlaywrightScrapeQueue {
  private stealth = require("puppeteer-extra-plugin-stealth")();
  private pool: any[];
  private queue: any[];
  private running: number;
  private size: number;
  constructor(size = 5) {
    chromium.use(this.stealth);

    this.pool = [];
    this.queue = [];
    this.running = 0;
    this.size = size;
  }
  async init() {
    for (let i = 0; i < this.size; i++) {
      this.pool.push(await this.createWindow());
    }
  }

  async createWindow() {
    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    const page = await browser.newPage();

    return page;
  }

  async scrape(resourceId: string, rate: number) {
    return new Promise((resolve) => {
      this.queue.push({ resourceId, rate, resolve });
      this.next();
    });
  }

  async next() {
    if (this.running >= this.size) return;
    if (this.queue.length === 0) return;
    const blockImages = (route: any) => {
      const type = route.request().resourceType();

      if (
        type === "image" ||
        type === "stylesheet" ||
        type === "font" ||
        type === "media"
      ) {
        route.abort();
      } else {
        route.continue();
      }
    };
    const job = this.queue.shift();
    this.running++;

    const win = this.pool.pop();

    try {
      await win.route("**/*", blockImages);

      await win.goto(`https://www.discogs.com/sell/release/${job.resourceId}`);

      await win.waitForSelector("#statistics");
      const text = await win.$eval("#statistics ul.last", (el: any) => {
        const lis = el.querySelectorAll("li");
        let text = { lowest: "", median: "", highest: "" };
        lis.forEach((li: any, i: any) => {
          if (i >= 1 && i <= 3) {
            const span = li.querySelector("span");
            span.remove();
            if (i === 1) text.lowest = li.textContent.trim();
            if (i === 2) text.median = li.textContent.trim();
            if (i === 3) text.highest = li.textContent.trim();
          }
        });
        return text;
      });

      const result = {
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

      job.resolve(result);
    } catch (e) {
      console.error(`Error scraping resource ${job.resourceId}:`, e);
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
