import "dotenv-flow/config";

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import preprocess from "rollup-plugin-preprocess";
import replace from "rollup-plugin-replace";
import execute from "rollup-plugin-execute";

export default [
  {
    input: "src/scripts/options.js",
    output: {
      file: "build/scripts/options.js",
      format: "iife"
    },
    plugins: [
      preprocess({
        context: {
          BROWSER: process.env.BROWSER,
        },
      }),
      resolve(),
      commonjs(),
      preprocess({
        context: {
          BROWSER: process.env.BROWSER,
        }
      }),
      execute("npm run preprocess-options-page"),
    ],
  },
  {
    input: "src/scripts/popup.js",
    output: {
      file: "build/scripts/popup.js",
      format: "iife"
    },
    plugins: [
      preprocess({
        context: {
          BROWSER: process.env.BROWSER,
        }
      }),
      resolve(),
      commonjs(),
      copy({
        targets: [{ src: "src/popup.html", dest: "build" }]
      }),
    ],
  },
  {
    input: "src/scripts/core.js",
    output: {
      name: "window",
      file: "build/scripts/background.js",
      format: "iife",
      extend: true
    },
    plugins: [
      replace({
        "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
        "process.env.CLIENT_SECRET": JSON.stringify(process.env.CLIENT_SECRET),
        "process.env.FEEDLY_URL": JSON.stringify(process.env.FEEDLY_URL),
        "process.env.FEEDLY_CLOUD_URL": JSON.stringify(process.env.FEEDLY_CLOUD_URL),
      }),
      preprocess({
        context: {
          BROWSER: process.env.BROWSER,
        },
      }),
      resolve(),
      commonjs(),
      copy({
        targets: [
          { src: "src/(_locales|images|sound|styles)", dest: "build" }
        ],
      }),
      execute("npm run manifest"),
    ],
  },
];
