import preactPlugin from "@preact/preset-vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preactPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      name: "@nice-avatar-svg/preact",
      entry: fileURLToPath(new URL("./NiceAvatar.jsx", import.meta.url)),
    },
  },
});
