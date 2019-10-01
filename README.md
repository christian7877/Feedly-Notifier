Feedly-Notifier
===============

[![Build Status](https://travis-ci.org/olsh/Feedly-Notifier.svg?branch=master)](https://travis-ci.org/olsh/Feedly-Notifier)
[![Maintainability](https://api.codeclimate.com/v1/badges/cc043ddadb231bfaa48b/maintainability)](https://codeclimate.com/github/olsh/Feedly-Notifier/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/olsh/Feedly-Notifier/badge.svg)](https://snyk.io/test/github/olsh/Feedly-Notifier)

Google chrome, Firefox and Opera extension for reading news from rss aggregator [Feedly](https://feedly.com)

## Changelog

Changelog can be found [here](https://github.com/olsh/Feedly-Notifier/releases).

## Build

1. Make `yarn` or `npm i`
2. To build extension
  - Sandbox: Run `npm run build` (by default)
  - Release: 
    - Use `.env.example` as template for `.env.local` and insert CLIENT_ID and CLIENT_SECRET
    - Run `npm run build`
3. The result of the commands will be in `build` directory, now you can load the extension to browser.

You can find actual `clientId` and `clientSecret` here https://groups.google.com/forum/#!topic/feedly-cloud/3izrTbT7FDQ

We use [`dotenv-flow`](https://github.com/kerimdzhanov/dotenv-flow) to separate config from application code.

The BROWSER environment variable can be `chrome`, `opera` or `firefox`.

## Acknowledgments

Made with  
[![WebStorm](https://github.com/olsh/Feedly-Notifier/raw/master/logos/ws-logo.png)](https://www.jetbrains.com/webstorm/)
