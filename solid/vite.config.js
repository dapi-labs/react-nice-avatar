import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [plugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      name: "@nice-avatar-svg/solid",
      entry: fileURLToPath(new URL("./NiceAvatar.jsx", import.meta.url)),
    },
  },
});
