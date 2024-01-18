import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "server/public"),
  },
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://shortly-api-n2k1.onrender.com", // refers to api url
        changeOrigin: true,
      },
    },
  },
});
