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
    language: {
      en: 'English',
      cn: '简体中文'
    },
    baseURL: 'https://ricoh.cloud.bluecomvn.com/',
    trace: 'on-first-retry',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: 'on',
    headless: false,
    launchOptions:{
      slowMo: 100
    },
    actionTimeout: 30000 //30s for timeout per action
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
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    },
  ],

});

