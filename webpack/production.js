const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge").default;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const packageJson = require("../package.json");

const baseConfig = require("./base");

const dependencyNameToExternals = (dependencyName) => [
  dependencyName,
  new RegExp(`^${dependencyName}/.*`),
];

const common = merge(baseConfig(), {
  mode: "production",
  devtool: "source-map",
  externals: [
    ...Object.keys(packageJson.dependencies).flatMap(dependencyNameToExternals),
    ...Object.keys(packageJson.peerDependencies).flatMap(
      dependencyNameToExternals
    ),
  ],
  resolve: {
    unsafeCache: true,
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../tsconfig.json") })
    ]
  },
  entry: {
    index: path.resolve(__dirname, "../src/index.tsx")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({ extractComments: false })
    ]
  },
  experiments: {
    outputModule: true,
  },
});

module.exports = [
  {
    ...common,
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist"),
      libraryTarget: "commonjs2",
    },
  },
  {
    ...common,
    output: {
      filename: "[name].esm.js",
      path: path.resolve(__dirname, "../dist"),
      environment: { module: true },
      libraryTarget: "module",
    },
  },
];
