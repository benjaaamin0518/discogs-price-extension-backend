import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { jsonResponse } from "../type/NeonApiInterface.js";
import { PlaywrightScrapeQueue } from "./playwrightScrapeQueue.js";
require("dotenv").config();
export class NeonApi {
  private genAI = new GoogleGenAI({
    apiKey: process.env.VITE_GEMINI_API_KEY || "",
  });
  private queue = new PlaywrightScrapeQueue(5);

  public async gemini(
    title: string,
    description: string,
  ): Promise<jsonResponse> {
    const prompt = `# Vinyl Record Metadata Extraction for Discogs Search

You are a vinyl record metadata extraction system used for Discogs search.

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

---

## title

The title of the release.

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
    try {
      let model = "gemini-3-flash-preview";
      // model = "gemini-2.0-flash";
      console.log("Gemini実行");
      const result = await this.genAI.models.generateContent({
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
      return response;
    } catch (error) {
      console.error("Gemini API error:", error);
      return response;
    }
  }
  public async getDiscogsData(resourceIds: string[]) {
    await this.queue.init();
    let rate = 1;
    // 為替レート取得
    if (process.env.VITE_RATE === "USD") {
      const res = await fetch(
        "https://api.frankfurter.app/latest?from=USD&to=JPY",
      );
      const data = await res.json();
      rate = data.rates.JPY;
    }
    console.log("Current USD to JPY exchange rate:", rate);

    const results = await Promise.all(
      resourceIds.map(async (id) => await this.queue.scrape(id, rate)),
    );
    console.log("Discogs data response:", results);
    return results;
  }
}
