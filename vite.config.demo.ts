import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "demo",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@oniharnantyo\/react-nice-avatar\/(.*)/,
        replacement: `${path.resolve(__dirname, "src")}/$1`,
      },
      {
        find: "@oniharnantyo/react-nice-avatar",
        replacement: path.resolve(__dirname, "src/index.tsx"),
      },
      {
        find: "shared-style",
        replacement: path.resolve(__dirname, "demo/src/scss"),
      },
    ],
  },
  server: {
    port: 8080,
  },
  build: {
    outDir: path.resolve(__dirname, "demo/dist"),
    emptyOutDir: true,
  },
});
