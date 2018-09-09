const fs = require('fs-extra');
const path = require('path');
const preprocess = require('preprocess');

const config = require('./config');

const source = `${config.paths.src}/manifest.json`;
const destination = path.join(__dirname, `../${config.paths.dist}/assets`);

const content = fs.readFileSync(source).toString();
const processed = preprocess.preprocess(content, null, { type: 'js' });

const json = JSON.parse(processed);

fs.ensureDirSync(destination);
fs.writeFileSync(
  path.join(destination, 'manifest.json'),
  JSON.stringify(json, null, 4),
);
