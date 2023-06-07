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
        { from: "./src/img", to: "img" }, // Copia i file dalla cartella src/img nella cartella dist/img
        { from: "./src/favicon.ico", to: "" }, // Copia i file dalla cartella src/img nella cartella dist/img
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html",
      favicon: "./src/favicon.ico",// Aggiorna il percorso del file favicon.ico
      scriptLoading: "defer", // Aggiungi questa riga per mantenere il comportamento di script defer
      inject: "head", // Aggiungi il percorso all'icona del favicon
      meta: {
        "apple-touch-icon": {
          name: "apple-touch-icon",
          property: "apple-touch-icon",
          content: "/img/apple-touch-icon.png", // Aggiungi il percorso all'icona di Apple touch
        },
        "icon-32": {
          name: "icon",
          property: "icon",
          sizes: "32x32",
          content: "/img/favicon-32x32.png", // Aggiungi il percorso all'icona da 32x32
        },
        "icon-16": {
          name: "icon",
          property: "icon",
          sizes: "16x16",
          content: "/img/favicon-16x16.png", // Aggiungi il percorso all'icona da 16x16
        },
        manifest: {
          name: "manifest",
          property: "manifest",
          href: "/img/site.webmanifest", // Aggiungi il percorso al file del manifesto
        },
      },
      publicPath: "./",
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser", // Usa 'process' come modulo fornito
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
