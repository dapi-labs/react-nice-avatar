import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// The app imports ../../src directly, so bare imports made inside src/
// (react, prop-types, chroma-js) are resolved from the repo root, which has
// no node_modules of its own — pin them to this example's copies instead.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(rootDir, "node_modules/react"),
      "prop-types": path.resolve(rootDir, "node_modules/prop-types"),
      "chroma-js": path.resolve(rootDir, "node_modules/chroma-js"),
    },
    dedupe: ["react", "react-dom"],
  },
});
