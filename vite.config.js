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
      name: "nice-avatar-svg",
      entry: {
        preact: fileURLToPath(new URL("./src/components/NiceAvatar.jsx", import.meta.url)),
        render: fileURLToPath(new URL("./src/render.jsx", import.meta.url)),
        constants: fileURLToPath(new URL("./src/constants.mjs", import.meta.url)),
        element: fileURLToPath(new URL("./src/element.jsx", import.meta.url)),
      },
    },
  },
});
