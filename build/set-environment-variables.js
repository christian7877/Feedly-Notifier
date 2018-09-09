const { argv } = require('yargs');

const clientId = argv.clientId;
if (clientId === undefined) {
  throw new Error('Argument "clientId" is required');
}
process.env.CLIENT_ID = clientId;

const clientSecret = argv.clientSecret;
if (clientSecret === undefined) {
  throw new Error('Argument "clientSecret" is required');
}
process.env.CLIENT_SECRET = clientSecret;

process.env.BROWSER = argv.browser || 'chrome';

if (argv.sandbox) {
  process.env.SANDBOX = argv.sandbox;
}
