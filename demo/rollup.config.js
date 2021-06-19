import path from "path";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";

let plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true
  }),
  babel({
    exclude: "node_modules/**"
  }),
  typescript({
    tsconfig: path.resolve(__dirname, "./tsconfig.json")
  }),
  resolve(),
  commonjs(),
  scss()
];
if (process.env.NODE_ENV === "development" && process.env.MODE !== "build") {
  plugins = plugins.concat([
    serve({
      open: false,
      verbose: true,
      contentBase: [path.resolve(__dirname, "./")],
      host: "localhost",
      port: 5555
    }),
    livereload({ watch: path.resolve(__dirname, "./src") })
  ]);
}

export default {
  input: path.resolve(__dirname, "./src/index.tsx"),
  output: [
    {
      file: path.resolve(__dirname, "./dist/index.js"),
      format: "iife",
      sourcemap: false
    }
  ],
  plugins
};
