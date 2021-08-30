const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  resolve: {
    unsafeCache: true,
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "../demo/tsconfig.json") })
    ],
    alias: {
      "react-nice-avatar": path.resolve(__dirname, "../src"),
      "shared-style": path.resolve(__dirname, "../demo/src/scss")
    }
  },
  entry: {
    app: process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "../demo/src/index.tsx")
      : ["react-hot-loader/patch", path.resolve(__dirname, "../demo/src/index.tsx")]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../demo/dist"),
    publicPath: "/"
  },
  devServer: {
    hot: true,
    hotOnly: true,
    contentBase: path.resolve(__dirname, "../demo/dist"),
    publicPath: "/",
    historyApiFallback: true,
    stats: "minimal",
    port: 8080
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new HtmlWebpackPlugin({
      title: "web",
      template: path.resolve(__dirname, "../demo/app.template.html")
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
});
