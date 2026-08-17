import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenvExpand.expand(env);

export default defineConfig({
  testDir: './tests',
  // timeout: 30 * 5000,
  // expect: { timeout: 20000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: 'html',
  use: {
    trace: 'retain-on-failure',
    video: 'on',
    screenshot: 'on',
    baseURL: process.env.BASEURL || 'https://the-internet.herokuapp.com',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
