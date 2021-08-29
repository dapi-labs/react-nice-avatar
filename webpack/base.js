const path = require("path");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, ".."),
  resolve: {
    modules: [path.resolve(__dirname, ".."), path.resolve(__dirname, "../node_modules")],
    extensions: [".tsx", ".ts", ".js"]
  },
  stats: {
    colors: true,
    reasons: true,
    hash: false,
    version: false,
    timings: true,
    chunks: true,
    chunkModules: true,
    cached: false,
    cachedAssets: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [tailwindcss, autoprefixer]
                ]
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};
