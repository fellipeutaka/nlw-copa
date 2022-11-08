module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@nlw-copa/routes": "./src/routes",
          "@nlw-copa/lib": "./src/lib",
          "@nlw-copa/plugins": "./src/plugins",
        },
      },
    ],
  ],
  ignore: ["src/@types/*"],
};
