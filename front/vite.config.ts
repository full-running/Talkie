import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
      target: "http://localhost:8787", // 임시처리: Codespaces 안에서는 이게 가장 안정적
        changeOrigin: true,
      },
    },
  },
});
