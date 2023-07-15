/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "off",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  ignorePatterns: [
    ".eslintrc.cjs",
    "vite.config.ts",
    "tailwind.config.js",
    "tsconfig.json",
  ],
};
