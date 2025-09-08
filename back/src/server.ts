import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// === 안전한 파일 경로 계산 (Codespaces/로컬 공통) ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// server.ts => src/ 에 있으므로 ../data/test.json
const dataPath = path.join(__dirname, "..", "data", "test.json");

// === JSON 데이터 로드 ===
const raw = fs.readFileSync(dataPath, "utf-8");
const db = JSON.parse(raw);

// === Hono (OpenAPI 지원) 인스턴스 ===
const app = new OpenAPIHono();

// CORS (개발 기본값: 전체 허용)
app.use("*", cors());

// --- OpenAPI 스펙 엔드포인트 등록 ---
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "Talkie API", version: "1.0.0" },
});

// Swagger UI 연결 (/docs)
app.get("/docs", swaggerUI({ url: "/openapi.json" }));

// === 엔드포인트 (OpenAPI 포함) ===

// Users
app.openapi(
  {
    method: "get",
    path: "/api/users",
    tags: ["Users"],
    responses: {
      200: {
        description: "User list",
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.string(),
                username: z.string(),
                email: z.string(),
                createdAt: z.string(),
              })
            ),
          },
        },
      },
    },
  },
  (c) => c.json(db.users)
);

// Posts
app.openapi(
  {
    method: "get",
    path: "/api/posts",
    tags: ["Posts"],
    responses: {
      200: {
        description: "Post list",
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.string(),
                authorId: z.string(),
                title: z.string(),
                body: z.string(),
                createdAt: z.string(),
              })
            ),
          },
        },
      },
    },
  },
  (c) => c.json(db.posts)
);

// Comments
app.openapi(
  {
    method: "get",
    path: "/api/comments",
    tags: ["Comments"],
    responses: {
      200: {
        description: "Comment list",
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.string(),
                postId: z.string(),
                authorId: z.string(),
                body: z.string(),
                createdAt: z.string(),
              })
            ),
          },
        },
      },
    },
  },
  (c) => c.json(db.comments)
);

// === 서버 실행 (Codespaces: PORT 환경변수 사용) ===
const port = Number(process.env.PORT || 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`API  → http://localhost:${port}`);
  console.log(`Docs → http://localhost:${port}/docs`);
  console.log(`Spec → http://localhost:${port}/openapi.json`);
});
