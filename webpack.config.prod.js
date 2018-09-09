const path = require('path');
const merge = require('webpack-merge');

const ZipWebpackPlugin = require('zip-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = require('./build/config');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new ZipWebpackPlugin({
      path: path.resolve(__dirname, `${config.paths.dist}`),
      filename: 'feedly-notifier.zip',
    })
  ]
});
