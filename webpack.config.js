const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
module.exports.target = 'node';

module.exports = {
  mode: "production",
  entry: './src/js/main.js', // Percorso del file di ingresso principale
  output: {
    path: path.resolve(__dirname, 'dist'), // Percorso della cartella di output
    filename: '[name].bundle.js' // Nome del file di output
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    }),
    new Dotenv()
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.map$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
