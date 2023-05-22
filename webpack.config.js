const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js', // Percorso del file di ingresso principale
  output: {
    path: path.resolve(__dirname, 'dist'), // Percorso della cartella di output
    filename: '[name].bundle.js' // Nome del file di output
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/html/index.html"
    })
  ]
};
