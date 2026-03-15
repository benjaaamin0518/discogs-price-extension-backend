// server-auth.ts
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

function extractToken(req: Request): string | null {
  const xt = req.body.accessToken;
  console.log(req.body);
  if (xt && typeof xt === "string") return xt;
  // SSE (EventSource) などでクエリに乗せる場合の受け取り（注意: URLにトークンが露出する）
  if (req.query && req.query.token) return String(req.query.token);
  return null;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const expected = process.env.REACT_APP_ACCESS_TOKEN || "";
  if (!expected) {
    console.warn("API token is not configured (REACT_APP_ACCESS_TOKEN).");
    return res.status(500).json({ error: "server misconfiguration" });
  }

  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: "missing token" });

  const a = Buffer.from(token);
  const b = Buffer.from(expected);

  // 長さが違う場合はすぐ拒否（timingSafeEqual は同長であることが前提）
  if (a.length !== b.length) {
    return res.status(401).json({ error: "invalid token" });
  }

  if (!crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "invalid token" });
  }

  return next();
}
