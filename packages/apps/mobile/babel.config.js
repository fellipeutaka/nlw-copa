module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx", ".js", ".json"],
          alias: {
            "@nlw-copa/components": "./src/components",
            "@nlw-copa/screens": "./src/screens",
            "@nlw-copa/routes": "./src/routes",
            "@nlw-copa/contexts": "./src/contexts",
            "@nlw-copa/hooks": "./src/hooks",
            "@nlw-copa/themes": "./src/themes",
            "@nlw-copa/utils": "./src/utils",
            "@nlw-copa/lib": "./src/lib",
            "@nlw-copa/assets": "./assets",
          },
        },
      ],
    ],
  };
};
