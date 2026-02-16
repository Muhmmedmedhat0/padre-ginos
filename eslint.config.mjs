import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";

// this for type checking and autocompletion in this file, it has no effect on the actual eslint configuration
/** @type {import('eslint').Linter.Config[]} */
export default [
  // this is the base config that includes all the recommended rules for JavaScript, including React, JSX, and accessibility rules
  js.configs.recommended,
  {
    // this is the config that includes all the recommended rules for React, including rules for hooks and JSX, and it also sets the React version to detect automatically
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // this is the config that enables the new jsx runtime, which allows us to use JSX without importing React
  reactPlugin.configs.flat["jsx-runtime"],
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
    rules: {
      "react/no-unescaped-entities": "error",
      "react/prop-types": "off",
    },
  },
  prettier,
];
