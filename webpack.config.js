const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  mode: "production",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "img/[name][ext]",
    publicPath: "./",
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/img", to: "img" },
        { from: "./src/favicon.ico", to: "" },
        { from: "./src/site.webmanifest", to: "" },
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html",
      favicon: "./src/favicon.ico", 
      scriptLoading: "defer",
      inject: "head",
      meta: {
        "apple-touch-icon": {
          name: "apple-touch-icon",
          property: "apple-touch-icon",
          content: "/img/apple-touch-icon.png",
        },
        "icon-32": {
          name: "icon",
          property: "icon",
          sizes: "32x32",
          content: "/img/favicon-32x32.png",
        },
        "icon-16": {
          name: "icon",
          property: "icon",
          sizes: "16x16",
          content: "/img/favicon-16x16.png",
        },
        manifest: {
          name: "manifest",
          property: "manifest",
          href: "./site.webmanifest",
        },
      },
      publicPath: "./",
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.webmanifest$/i,
        type: "asset/resource",
      },
      {
        test: /\.map$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "not dead", "ie >= 11"],
                  },
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
