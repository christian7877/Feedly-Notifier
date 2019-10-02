import "dotenv-flow/config";

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import preprocess from "rollup-plugin-preprocess";
import replace from "rollup-plugin-replace";
import execute from "rollup-plugin-execute";

import paths from "./tools/paths";

export default [
  {
    input: `${paths.src}/scripts/options.js`,
    output: {
      file: `${paths.dist}/scripts/options.js`,
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
      copy({
        targets: [{ src: `${paths.src}/options.html`, dest: paths.dist }]
      }),
    ],
  },
  {
    input: `${paths.src}/scripts/popup.js`,
    output: {
      file: `${paths.dist}/scripts/popup.js`,
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
        targets: [{ src: `${paths.src}/popup.html`, dest: paths.dist }]
      }),
    ],
  },
  {
    input: `${paths.src}/scripts/core.js`,
    output: {
      name: "window",
      file: `${paths.dist}/scripts/background.js`,
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
          { src: `${paths.src}/(_locales|images|sound|styles)`, dest: paths.dist }
        ],
      }),
      execute("npm run manifest"),
    ],
  },
];
