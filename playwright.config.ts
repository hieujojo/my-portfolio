import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3192',
    reuseExistingServer: true,
    timeout: 120_000,
  },
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
    { name: 'small-mobile', use: { viewport: { width: 320, height: 568 }, deviceScaleFactor: 1, isMobile: true } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
