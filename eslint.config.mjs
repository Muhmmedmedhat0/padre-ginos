import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

// this for type checking and autocompletion in this file, it has no effect on the actual eslint configuration
/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...jsxA11y.flatConfigs.strict,
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  prettier,
];
