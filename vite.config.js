import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      name: "nice-avatar-svg",
      entry: {
        solid: fileURLToPath(new URL("./src/components/NiceAvatar.jsx", import.meta.url)),
        render: fileURLToPath(new URL("./src/render.jsx", import.meta.url)),
        element: fileURLToPath(new URL("./src/element.jsx", import.meta.url)),
      },
    },
  },
});
