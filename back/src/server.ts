import { Hono } from "hono";
import { cors } from "hono/cors";   // ✅ 수정됨
import { serve } from "@hono/node-server";

const app = new Hono();
app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/api/health", (c) => c.json({ ok: true, ts: new Date().toISOString() }));

const port = Number(process.env.PORT || 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`API on http://localhost:${port}`);
});
