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
        target: process.env.VITE_API_URL, // refers to api url
        changeOrigin: true,
      },
    },
  },
});
