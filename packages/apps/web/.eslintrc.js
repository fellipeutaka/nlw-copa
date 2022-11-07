const config = require("eslint-config-custom");

module.exports = {
  ...config,
  root: true,
  extends: [...config.extends, "next"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};
