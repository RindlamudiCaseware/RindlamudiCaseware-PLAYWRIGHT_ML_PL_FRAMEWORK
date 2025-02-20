// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60000,
  globalSetup: './src/global-setup',
  globalTeardown: './src/global-teardown',
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['line']
  ],
  use: {
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
    // baseURL: 'https://app-stage.pluralsight.com/'
     baseURL: 'https://www.saucedemo.com/'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  
  ]
});
