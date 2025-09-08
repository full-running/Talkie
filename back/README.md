# Talkie API (back)

Hono + TypeScript 기반의 간단한 게시판 API.  
기본 프리픽스는 `/api` 입니다. (개발용 JSON 시드 → 이후 SQLite 이관 예정)

- 런타임: Node 18+
- 프레임워크: Hono
- 문서화: OpenAPI 3.0 + Swagger UI
- 데이터 소스(개발): `back/data/test.json`

---

## 📂 디렉토리
```
back/
├─ src/
│  └─ server.ts
├─ data/
│  └─ test.json
├─ package.json
└─ tsconfig.json
```

---

## 🚀 실행
```bash
cd back
npm install
npm run dev
```
- **Docs (Swagger UI)**: `/docs`
- **OpenAPI 스펙(JSON)**: `/openapi.json`

> **Codespaces**: 포트(예: 8787)를 Ports 탭에서 **Public** 으로 설정 후  
> `https://<codespace>-8787.app.github.dev/docs` 로 접속하세요.

---

## 🌱 개발용 데이터 (test.json 예시)
```json
{
  "users": [
    { "id": "u_1", "username": "minsang", "email": "minsang@example.com", "passwordHash": "pass:1234", "createdAt": "2025-09-08T00:00:00.000Z" }
  ],
  "posts": [
    { "id": "p_1", "authorId": "u_1", "title": "첫 글", "body": "내용", "createdAt": "2025-09-08T02:00:00.000Z" }
  ],
  "comments": [],
  "sessions": [],
  "currentToken": null
}
```

---

## 🔐 인증/권한 정책 (초안)
- 비로그인: 게시글/댓글 **조회만**
- 로그인 필요: **작성/수정/삭제**
- 작성자만: 자신의 글/댓글 **수정/삭제**
- 데모 환경에선 토큰을 **쿠키 `token`** 또는 **메모리 세션**으로 취급

---

## 📚 현재 엔드포인트 (예시)
- `GET /api/users` — 유저 목록
- `GET /api/posts` — 게시글 목록
- `GET /api/comments` — 댓글 목록

> 이후 `auth`, `posts`, `comments` CRUD를 점진 추가 예정

---

## 🧩 Swagger + OpenAPI 연동 가이드

### 1) 설치
```bash
npm i zod @hono/zod-openapi @hono/swagger-ui
```

### 2) 서버 코드 예시 (`src/server.ts` 발췌)
> **경로 하드코딩 금지**: `import.meta.url`로 안전하게 파일 경로 계산

```ts
import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "test.json"); // 안전한 상대 경로

const raw = fs.readFileSync(dataPath, "utf-8");
const db = JSON.parse(raw);

const app = new OpenAPIHono();
app.use("*", cors());

// OpenAPI 스펙
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: { title: "Talkie API", version: "1.0.0" },
});

// Swagger UI
app.get("/docs", swaggerUI({ url: "/openapi.json" }));

// 예시 엔드포인트들 (OpenAPI 포함)
app.openapi(
  { method: "get", path: "/api/users", tags: ["Users"],
    responses: { 200: { description: "users",
      content: { "application/json": { schema: z.array(z.object({ id: z.string(), username: z.string(), email: z.string(), createdAt: z.string() })) } } } } },
  (c) => c.json(db.users)
);

app.openapi(
  { method: "get", path: "/api/posts", tags: ["Posts"],
    responses: { 200: { description: "posts",
      content: { "application/json": { schema: z.array(z.object({ id: z.string(), authorId: z.string(), title: z.string(), body: z.string(), createdAt: z.string() })) } } } } },
  (c) => c.json(db.posts)
);

app.openapi(
  { method: "get", path: "/api/comments", tags: ["Comments"],
    responses: { 200: { description: "comments",
      content: { "application/json": { schema: z.array(z.object({ id: z.string(), postId: z.string(), authorId: z.string(), body: z.string(), createdAt: z.string() })) } } } } },
  (c) => c.json(db.comments)
);

const port = Number(process.env.PORT || 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`API  → http://localhost:${port}`);
  console.log(`Docs → http://localhost:${port}/docs`);
  console.log(`Spec → http://localhost:${port}/openapi.json`);
});
```

### 3) Codespaces 팁
- 포트(예: 8787)를 **Public** 으로 설정
- 접근 URL 예: `https://<codespace-id>-8787.app.github.dev/docs`
- 프론트 개발 중엔 Vite 프록시(`/api` → `http://localhost:8787`)를 쓰면 주소 변경에 영향 없음

---

## 🔎 cURL 예제
```bash
curl http://localhost:8787/api/users
curl http://localhost:8787/api/posts
curl http://localhost:8787/api/comments
```

---

## 🗺️ 향후 계획
- [ ] SQLite(better-sqlite3) 도입 및 마이그레이션
- [ ] JWT + HttpOnly 쿠키 인증
- [ ] 입력 검증(Zod) 정교화
- [ ] 페이지네이션/검색/정렬
- [ ] 테스트 코드(Jest 등)