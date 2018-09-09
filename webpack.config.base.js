const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./build/config');

console.log(typeof process.env.SANDBOX, process.env.SANDBOX ? config.api.sandbox : config.api.production);

module.exports = {
  context: path.resolve(__dirname, `./${config.paths.src}/scripts`),
  entry: {
    background: './background.js',
    popup: './popup.js',
    options: './options.js',
  },
  output: {
    filename: '[name].js',
    // library: 'this',
    // libraryTarget: 'window',
    path: path.resolve(__dirname, `${config.paths.dist}/assets`),
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'preprocess-loader',
            options: {
              BROWSER: process.env.BROWSER,
            },
          },
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'preprocess-loader',
            options: {
              BROWSER: process.env.BROWSER,
            },
          },
          {
            loader: 'html-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      BROWSER: JSON.stringify(process.env.BROWSER),
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
      FEEDLY_API_URL: JSON.stringify(process.env.SANDBOX ? config.api.sandbox : config.api.production),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, `${config.paths.dist}/assets`),
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
  ],
}