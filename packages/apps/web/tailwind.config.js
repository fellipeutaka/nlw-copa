const config = require("@nlw-copa/tailwind-config");

/** @type {import("tailwindcss").Config} */
module.exports = {
  ...config,
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      backgroundImage: {
        app: "url(/app-bg.png)",
      },
    },
  },
};
