import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import scss from "rollup-plugin-scss";

let plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    preventAssignment: true
  }),
  babel({
    exclude: "node_modules/**"
  }),
  resolve(),
  commonjs(),
  scss()
]
if (process.env.NODE_ENV === 'development' && process.env.MODE !== 'build') {
  plugins = plugins.concat([
    serve({
      open: false,
      verbose: true,
      contentBase: ["demo"],
      host: "localhost",
      port: 5555
    }),
    livereload({ watch: "demo" })
  ])
}

export default {
  input: "demo/index.js",
  output: [
    {
      file: "demo/dist/index.js",
      format: "iife",
      sourcemap: true
    }
  ],
  plugins
};
