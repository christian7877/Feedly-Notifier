const fs = require('fs');
const path = require('path');
const preprocess = require('preprocess');

const paths = require("./paths");

const manifest = fs.readFileSync(`${paths.src}/manifest.json`).toString();
const manifestPath = path.join(__dirname, `../${paths.dist}/manifest.json`);

const processed = preprocess.preprocess(manifest, { BROWSER: JSON.stringify(process.env.BROWSER) }, { type: 'js' });

const json = JSON.parse(processed);

fs.writeFileSync(
  manifestPath,
  JSON.stringify(json, null, 4),
);
