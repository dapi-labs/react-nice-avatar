import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: false,
      exports: "named"
    }
  ],
  external: ["react", "prop-types"],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**"
    }),
    typescript({
      tsconfig: "tsconfig.json"
    }),
    resolve(),
    commonjs()
  ]
};
