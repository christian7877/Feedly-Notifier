const fs = require('fs-extra');
const path = require('path');

const config = require('./config');

const directory = path.resolve(__dirname, '..', `${config.paths.dist}`);

fs.removeSync(path.join(directory, 'assets'));
fs.removeSync(path.join(directory, 'feedly-notifier.zip'))
