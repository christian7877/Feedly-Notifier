const fs = require('fs');
const path = require('path');
const preprocess = require('preprocess');

const optionsTemplate = fs.readFileSync('src/options.html').toString();
const optionsBuildPath = path.join(__dirname, `../build/options.html`);

const template = preprocess.preprocess(optionsTemplate, { BROWSER: process.env.BROWSER }, { type: 'html' });

fs.writeFileSync(
  optionsBuildPath,
  template,
);
