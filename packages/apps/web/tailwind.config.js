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
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
      keyframes: {
        hide: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideIn: {
          "0%": { transform: "translateX(calc(100% + 24px))" },
          "100%": { transform: "translateX(0)" },
        },
        swipeOut: {
          "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          "100%": { transform: "translateX(calc(100% + 24px))" },
        },
      },
    },
  },
};
