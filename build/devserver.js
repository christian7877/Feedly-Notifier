require('./set-environment-variables');
require('./clean');
require('./manifest');

const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");

const config = require('../webpack.config.dev');

for (var entryName in config.entry) {
  config.entry[entryName] =
    [
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/dev-server"
    ].concat(config.entry[entryName]);
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

var compiler = webpack(config);

var server =
  new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../build"),
    headers: { "Access-Control-Allow-Origin": "*" }
  });

server.listen(3000);
