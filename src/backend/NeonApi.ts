import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { discogsData, jsonResponse } from "../type/NeonApiInterface";
require("dotenv").config();
export class NeonApi {
  private genAI = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY || "",
  });
  private stealth = require("puppeteer-extra-plugin-stealth")();
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
    let response: discogsData[] = resourceIds.map((id) => ({
      resourceId: id,
      lowest: null,
      median: null,
      highest: null,
    }));
    const { chromium } = require("playwright-extra");

    chromium.use(this.stealth);

    const init = async (resourceId: string) => {
      try {
        const browser = await chromium.launch({ headless: true });

        const page = await browser.newPage();
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

        await page.route("**/*", blockImages);

        await page.goto(`https://www.discogs.com/sell/release/${resourceId}`);

        await page.waitForSelector("#statistics");

        const text = await page.$eval("#statistics ul.last", (el: any) => {
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
        response[response.findIndex((r) => r.resourceId === resourceId)] = {
          resourceId,
          lowest: text.lowest
            ? parseFloat(text.lowest.replace(/[^0-9.]/g, ""))
            : null,
          median: text.median
            ? parseFloat(text.median.replace(/[^0-9.]/g, ""))
            : null,
          highest: text.highest
            ? parseFloat(text.highest.replace(/[^0-9.]/g, ""))
            : null,
        };
        await browser.close();
      } catch (error) {
        console.error(
          `Error fetching data for resourceId ${resourceId}:`,
          error,
        );
      }
    };
    await Promise.all(resourceIds.map((id) => init(id)));
    console.log("Discogs data response:", response);
    return response;
  }
}
