import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      // Only match explicitly named .node.test files
      include: ["src/**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      // Only match .browser.test files for Browser environment
      include: ["src/**/*.browser.test.{js,jsx}"],
      name: "browser",
      environment: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
      },
    },
  },
]);
