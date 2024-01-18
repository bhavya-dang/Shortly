import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "server/public"),
  },
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // refers to api url
        changeOrigin: true,
      },
    },
  },
});
