const path = require("path");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, ".."),
  resolve: {
    modules: [
      path.resolve(__dirname, ".."),
      path.resolve(__dirname, "../node_modules")
    ],
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
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-private-methods",
              "@babel/plugin-syntax-async-generators",
              "@babel/plugin-transform-regenerator",
              'react-hot-loader/babel',
            ],
          },
        },
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
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          limit: 10000
        }
      }
    ]
  }
};
