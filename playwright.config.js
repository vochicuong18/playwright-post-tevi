// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const path = require('path');
module.exports = defineConfig({
  timeout: 0,
  testDir: './ricoh/sanity',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  reporter: 'allure-playwright',
  use: {
    actionTimeout: 30000,
    baseURL: 'https://ricoh.cloud.bluecomvn.com/',
    trace: 'on-first-retry',
    headless: false,
    language: {
      en: 'English',
      cn: '简体中文'
    },
    video: 'on',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
      screenshotPath: path.join(__dirname, 'my-screenshots'),
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

