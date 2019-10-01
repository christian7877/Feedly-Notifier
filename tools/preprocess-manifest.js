const fs = require('fs');
const path = require('path');
const preprocess = require('preprocess');

const manifest = fs.readFileSync(`src/manifest.json`).toString();
const manifestPath = path.join(__dirname, `../build/manifest.json`);

const processed = preprocess.preprocess(manifest, { BROWSER: JSON.stringify(process.env.BROWSER) }, { type: 'js' });

const json = JSON.parse(processed);

fs.writeFileSync(
  manifestPath,
  JSON.stringify(json, null, 4),
);
