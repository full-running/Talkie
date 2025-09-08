import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier"; // ⬅️ 충돌 제거용

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettier, // ⬅️ 마지막에 위치: ESLint의 스타일 규칙을 끈다
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // ✅ 스타일 규칙은 Prettier가 담당하므로 여기서 빼는 걸 권장
      // "semi": ["error", "always"],
      // "quotes": ["error", "double"],
      // "indent": ["error", 2],
      // "linebreak-style": ["error", "unix"],
      // "no-trailing-spaces": "error",
      // "eol-last": ["error", "always"],

      // 기능 규칙만 유지
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
]);
