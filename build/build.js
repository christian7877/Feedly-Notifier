require('./set-environment-variables');
require('./clean');
require('./manifest');

const webpack = require('webpack');
const config = require('../webpack.config.prod');

webpack(config, function(error) {
  if (error) throw error;
});
