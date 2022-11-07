const config = require("eslint-config-custom");

module.exports = {
  ...config,
  root: true,
  extends: [...config.extends, "plugin:react/jsx-runtime"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};
