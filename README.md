# Talkie
React + Vite + TypeScript 기반의 회원 인증 및 게시판 CRUD 학습 프로젝트


## 폴더구조
```bash
Talkie/
├─ front/ # React + Vite + TypeScript + Tailwind (클라이언트)
│ ├─ src/
│ │ ├─ app/ # 전역 설정, config
│ │ ├─ components/ # 공용 컴포넌트
│ │ ├─ features/ # 도메인 단위 (auth, posts 등)
│ │ ├─ index.css # Tailwind 엔트리
│ │ └─ main.tsx
│ ├─ vite.config.ts
│ └─ package.json
│
├─ back/ # Hono + SQLite (API 서버)
│ ├─ src/
│ │ ├─ server.ts # 서버 엔트리
│ │ ├─ db.ts # DB 초기화/연결
│ │ ├─ auth.ts # 인증 라우트 (signup/login/me/logout)
│ │ ├─ posts.ts # 게시글 CRUD
│ │ └─ comments.ts # 댓글 CRUD
│ ├─ package.json
│ └─ tsconfig.json
│
└─ README.md
```

## 🚀 실행 방법

### 1) 백엔드 (back)
```bash
cd back
npm install
npm run dev
# http://localhost:8787/api/health
```

### 2) 프론트엔드 (front)

```bash
cd front
npm install
npm run dev
# http://localhost:5173
```

### 3) 루트에서 동시 실행

```bash
npm install -D concurrently
npm run dev
```

## 🛠️ 기술스택

### Front
- React 19 + Vite + TypeScript
- Tailwind CSS
- React Router (추후 적용 예정)
- 상태 관리: React Hooks(useState, useEffect, useReducer 등 학습 중심)

### Back
- Hono (경량 웹 프레임워크)
- SQLite + better-sqlite3
- Zod (입력 검증 예정)
- jsonwebtoken (세션/인증 예정)

### 주요 기능 (구현 단계)

- [v] 백엔드/프론트 개발 환경 분리
- [v] 헬스체크 API 연결 확인
- [v] Tailwind 스타일 적용 확인
- [ ] 회원가입 (signup)
- [ ] 로그인/로그아웃 (login/logout)
- [ ] 현재 로그인된 사용자 정보 조회 (me)
- [ ] 게시글 CRUD
- [ ] 댓글 CRUD
- [ ] 로그인 사용자만 글/댓글 작성/수정/삭제 가능

### 🎯 목표
- React Hooks 학습: useState, useEffect, useReducer, useMemo, - - useCallback 등 실제 적용
- 풀스택 기초 경험: 간단한 백엔드(Hono)와 프론트(React)를 직접 연결
- CRUD 학습: 사용자 인증 → 게시판 → 댓글까지 확장

### 📖 참고

- [React 공식 문서](https://react.dev)
- [Hono 공식 문서](https://hono.dev)
- [TailwindCSS 문서](https://tailwindcss.com/docs)