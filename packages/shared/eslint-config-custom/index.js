module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["import-helpers", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": "off",
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "arrow-parens": ["warn", "always"],
    "no-unused-vars": "warn",
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/naming-convention": "warn",
    "@next/next/google-font-display": "off",
    "@next/next/google-font-preconnect": "off",
    "@next/next/no-page-custom-font": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/^@encontrei/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
  },
  globals: {
    JSX: "writable",
  },
};
