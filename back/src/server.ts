import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import fs from "fs";

const app = new Hono();
app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

// JSON seed 불러오기
const raw = fs.readFileSync("./data/test.json", "utf-8");
const db = JSON.parse(raw);

// 헬스체크
app.get("/api/health", (c) => c.json({ ok: true, ts: new Date().toISOString() }));

// 유저 목록 예시
app.get("/api/users", (c) => c.json(db.users));

// 게시글 목록 예시
app.get("/api/posts", (c) => c.json(db.posts));

// 댓글 목록 예시
app.get("/api/comments", (c) => c.json(db.comments));

const port = Number(process.env.PORT || 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`API on http://localhost:${port}`);
});
