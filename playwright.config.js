// @ts-check
import {defineConfig, devices} from '@playwright/test';
import os from "node:os";
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  timeout: 0,
  testDir: './ricoh/sanity',
  workers: 1,
  reporter: [
    [
      "allure-playwright",
      {
        detail: false,
        environmentInfo: {
          OS: os.platform(),
          OSVersion: os.version(),
          Architecture: os.arch(),
          NodeVersion: process.version,
        },
      },
    ],
  ],
  use: {
    actionTimeout: 30000,
    baseURL: 'https://ricoh.cloud.bluecomvn.com/',
    headless: false,
    language: {
      en: 'English',
      cn: '简体中文'
    },
    video: 'on',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    launchOptions:{
      slowMo: 100,
      args: ['--start-maximized']
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        channel: 'chrome',
        viewport: null,
      },
    },
  ],
});

