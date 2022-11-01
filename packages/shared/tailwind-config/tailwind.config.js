/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/{pages,screens}/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};
