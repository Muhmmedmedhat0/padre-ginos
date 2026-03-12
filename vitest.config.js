import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  test: {
    projects: [
      {
        test: {
          name: "happy-dom",
          environment: "happy-dom",
          include: ["src/**/*.node.test.{js,jsx}"],
        },
      },
      {
        test: {
          name: "browser",
          include: ["src/**/*.browser.test.{js,jsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
