/* eslint-disable unicorn/prefer-module */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
      },
    ],
    "@babel/preset-typescript",
  ],
};
