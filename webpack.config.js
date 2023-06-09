var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
      },
    plugins: [
      new HtmlWebpackPlugin({
        template:"assets/templates/index.html",
        filename: "index.html",
      }),
      new CopyPlugin({
        patterns: [
          { from: "cocos2d-js-v3.13/*", to: "dist" },
          { from: "assets", to: "assets" }
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), 
      },
      open: true, 
    },
  
    mode: 'development', 
}