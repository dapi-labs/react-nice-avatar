import plugin from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [plugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      name: "@nice-avatar-svg/react",
      entry: fileURLToPath(new URL("./NiceAvatar.jsx", import.meta.url)),
    },
  },
});
