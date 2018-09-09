const merge = require('webpack-merge');
const webpack = require('webpack');

const WriteFilePlugin = require('write-file-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
  ],
  devtool: 'cheap-module-source-map',
});

module.exports = config;
