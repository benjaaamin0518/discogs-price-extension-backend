import express from "express";
import ScrapeQueue from "./scrapeQueue.js";
import cors from "cors";
import {
  geminiApiRequest,
  geminiApiResponse,
  jsonResponse,
} from "../type/NeonApiInterface.js";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";
import { app } from "electron";
import path from "path";
import { dir } from "console";
import { authMiddleware } from "./serverAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 開発環境と本番環境でパスを切り替える
const envPath = app.isPackaged
  ? path.join(process.resourcesPath, ".env") // 本番: 実行ファイルと同じ場所
  : path.resolve(__dirname, "../../../.env"); // 開発: プロジェクトルート
dotenv.config({ path: envPath });
export default function startAPI() {
  const queue = new ScrapeQueue(
    parseInt(process.env.REACT_APP_POOL_SIZE || "5"),
  );
  const genAI = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY || "",
  });
  const app = express();
  app.use(cors());
  app.options("*", cors());
  app.use(express.json({ limit: "10mb" }));
  app.post(
    "/api/v1/gemini",
    authMiddleware,
    async (req: geminiApiRequest, res: geminiApiResponse) => {
      try {
        console.log("Received request:", req.body);
        const { title, description } = req.body;
        const prompt = `You are a vinyl record metadata extraction system used for Discogs search.

      Extract record information from marketplace listing data.

      Your output will be parsed by a JSON parser. Therefore the output **MUST be valid JSON**.

      ## Output Restrictions

      DO NOT output:

      - Markdown
      - Code blocks
      - Any text before or after JSON

      Return **ONLY a raw JSON object**.

      ---

      # Input Fields

      ## title
      Listing title of the marketplace post.

      ## description
      Seller description text.

      ---

      # Important Concept

      catalog_number is the **most important field**.

      A catalog number is usually a short code printed on the record label or sleeve.  
      It is commonly used to identify releases on Discogs.

      Examples of catalog numbers:

      RKID004T  
      CRELP 076  
      FACT 75  
      L31450  
      RIPLP12  
      WIGLP123  
      XL1234  
      KRS123  

      Catalog numbers often:

      - contain capital letters and numbers
      - appear in the title of marketplace listings
      - appear after words like **型番**, **cat**, **cat no**, **catalog**

      ---

      # Fields Definition

      ## catalog_number
      The label catalog number printed on the release.

      Extract it **EXACTLY as written**.

      ---

      ## matrix_number

      The runout / matrix number etched in the vinyl.

      ---

      ## artist

      The main artist name of the release.

      **Return the artist name exactly as it appears in the input whenever possible.**  
      Avoid translating or altering the language unnecessarily. Preserve the original script (Japanese, English, etc.) unless normalization is clearly required.

      ---

      ## title

      The title of the release. 

      **Extract the title EXACTLY as it appears.** Strip away unnecessary tags, but ensure the core title remains in its original language. Do not attempt to translate it or modify its character set.

      ---

      ## format

      Return **Discogs-style format information as a comma-separated string**.

      ### IMPORTANT

      Discogs format values contain many variations.  
      To ensure compatibility with Discogs search, the format values must follow **actual Discogs conventions**.

      When determining format:

      - Prefer values that commonly appear in **Discogs release data**
      - Avoid inventing new format strings
      - Only use **widely used Discogs format descriptors**

      ---

      ## Common Discogs Format Descriptors

      ### Material

      Vinyl

      ### Size

      7"  
      10"  
      12"

      ### Speed

      33 ⅓ RPM  
      45 RPM

      ### Release Type

      Album  
      Single  
      EP  
      Maxi-Single

      ### Audio Type

      Stereo  
      Mono

      ---

      ## Example Valid Discogs Format Strings

      Vinyl, 12", 33 ⅓ RPM, Album, Stereo  
      Vinyl, 7", 45 RPM, Single  
      Vinyl, 12", EP  
      Vinyl, 12", Maxi-Single  
      Vinyl

      ---

      ## Normalization Guidelines

      If the listing mentions:

      LP / 12" / 7" / EP / Record / レコード  
      → include **"Vinyl"**

      ### Size mapping

      LP → include **12"**  
      12" → include **12"**  
      7" → include **7"**  
      10" → include **10"**

      ### Speed mapping

      33rpm / 33 RPM → **33 ⅓ RPM**  
      45rpm / 45 RPM → **45 RPM**

      ### Release type mapping

      single → **Single**  
      ep → **EP**  
      album → **Album**

      ### Audio type mapping

      stereo → **Stereo**  
      mono → **Mono**

      ---

      ## Format Order

      Return values in this approximate order:

      Material → Size → Speed → Type → Audio

      Example:

      Vinyl, 12", 33 ⅓ RPM, Album, Stereo

      ---

      ## country

      Country of release if explicitly mentioned.

      ---

      ## year

      Release year if explicitly written.

      ---

      ## confidence

      A value between **0 and 1** representing how confident the extraction is.

      ---

      # Extraction Priority (VERY IMPORTANT)

      1. catalog_number  
      2. artist  
      3. title  
      4. format  

      ---

      # Rules

      - Analyze **BOTH title and description**
      - Always attempt to find a **catalog_number first**
      - If a pattern like RKID004T, CRELP076, FACT75 etc appears, treat it as **catalog_number**
      - Prefer values appearing in the **listing title**
      - When generating **format**, reference **typical Discogs format conventions**
      - Do **NOT guess values**
      - If a value is not found, return **null**
      - Ensure the result is **valid JSON before returning**

      ---

      # Schema

      {
        "catalog_number": string|null,
        "matrix_number": string|null,
        "artist": string|null,
        "title": string|null,
        "format": string|null,
        "country": string|null,
        "year": number|null,
        "confidence": number
      }

      ---

      # Input

      title:
      ${title}

      description:
      ${description}`;
        let response: jsonResponse = {
          catalog_number: null,
          matrix_number: null,
          artist: null,
          title: null,
          format: null,
          country: null,
          year: null,
          confidence: 0,
        };
        let model = "gemini-3-flash-preview";
        // model = "gemini-2.0-flash";
        console.log("Gemini実行");
        const result = await genAI.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: 1.0,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });
        console.log(result.text);

        response = JSON.parse(result.text || "{}") as jsonResponse;

        // ユーザー情報とトークンをクライアントに返す
        res.status(200).json({
          status: 200, // ステータスコード
          result: response,
        });
        return;
      } catch (error: any) {
        res.status(500).json({
          error: error.message,
          status: 500, // ステータスコード
        });
        return;
      }
    },
  );

  app.post("/api/v1/discogsData", authMiddleware, async (req, res) => {
    try {
      console.log("Received request:", req.body);
      const ids = req.body.resourceIds as string[];

      let rate = 1;

      if (process.env.REACT_APP_RATE === "USD") {
        const r = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=JPY",
        );

        const data = await r.json();

        rate = data.rates.JPY;
      }
      if (process.env.REACT_APP_RATE === "EUR") {
        const r = await fetch(
          "https://api.frankfurter.app/latest?from=EUR&to=JPY",
        );

        const data = await r.json();

        rate = data.rates.JPY;
      }
      console.log(`Scraping ${ids.length} resources with rate ${rate}`);
      const jobInfo = queue.createJobInfo(rate, ids, req.body.jobId);
      const results = await Promise.all(
        ids.map(async (id) => await queue.scrape(jobInfo.jobId)),
      );
      return res.json(results);

      // res.status(200).json({
      //   status: 200, // ステータスコード
      //   result: results, // 結果データ
      // });
      // return;
    } catch (e) {
      console.error("Error in API endpoint:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  /**
   * POST /api/scrape/:jobId
   * 特定 jobId の現在状態を返す
   */
  app.post("/api/scrape/:jobId", authMiddleware, (req, res) => {
    const { jobId } = req.params;
    // console.log(jobId);
    if (typeof jobId !== "string")
      return res.status(404).json({ error: "jobId is not string" });
    const job = queue.getJobInfo(jobId);
    if (!job) return res.status(404).json({ error: "job not found" });
    return res.json(job);
  });

  app.post("/api/v1/jobInfos", authMiddleware, async (req, res) => {
    try {
      console.log("Received request for job infos:", req.body);
      const jobInfos = queue.getJobInfos();

      res.status(200).json({
        status: 200, // ステータスコード
        result: jobInfos, // ジョブ情報データ
      });
      return;
    } catch (e) {
      console.error("Error in jobInfos API endpoint:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.listen(3000, () => {
    console.log("API running http://localhost:3000");
  });
}
