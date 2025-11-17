import { defineConfig, devices } from "@playwright/test";

// Learn more: https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: "e2e/tests",
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    headless: true,
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  webServer: {
    command: process.env.PW_SKIP_SERVER
      ? 'echo "skip server"'
      : "bundle exec rails server -p 3000 -e test",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
