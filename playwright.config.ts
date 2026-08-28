import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:3192',
    headless: true,
    trace: 'retain-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
