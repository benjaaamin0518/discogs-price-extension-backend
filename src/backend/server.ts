import express, { response } from "express";
import cors from "cors";
import { NeonApi } from "./NeonApi";
require("dotenv").config();
import { geminiApiRequest, geminiApiResponse } from "../type/NeonApiInterface";
const app = express();
const neonApi = new NeonApi();
// CORSの設定
const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL, // フロントエンドのURLを環境変数から取得
  method: [],
};
// CORS設定とJSONパーサーをミドルウェアとして適用
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "10mb" }));

// ログイン認証を行う(成功時アクセストークンを返却する)
app.post(
  "/api/v1/gemini",
  async (req: geminiApiRequest, res: geminiApiResponse) => {
    try {
      console.log("Received request:", req.body);
      if (req.body.accessToken !== process.env.VITE_ACCESS_TOKEN) {
        res.status(401).json({
          error: "Invalid access token",
          status: 401,
        });
        return;
      }
      const result = await neonApi.gemini(req.body.title, req.body.description);
      // ユーザー情報とトークンをクライアントに返す
      res.status(200).json({
        status: 200, // ステータスコード
        result,
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
app.post("/api/v1/discogsData", async (req: any, res: any) => {
  try {
    console.log("Received request for discogs data:", req.body);
    if (req.body.accessToken !== process.env.VITE_ACCESS_TOKEN) {
      res.status(401).json({
        error: "Invalid access token",
        status: 401,
      });
      return;
    }
    const result = await neonApi.getDiscogsData(req.body.resourceIds);
    // ユーザー情報とトークンをクライアントに返す
    res.status(200).json({
      status: 200, // ステータスコード
      result,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      status: 500, // ステータスコード
    });
    return;
  }
});
app.listen(4200, () => {
  console.log(`port ${4200} でサーバー起動中`);
});
