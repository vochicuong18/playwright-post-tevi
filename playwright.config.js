// @ts-check
import {defineConfig, devices} from '@playwright/test';
import os from "node:os";
import dotenv from 'dotenv';
import path from 'path';
/**
 * @see https://playwright.dev/docs/test-configuration
 */

// Read from ".env" file.
dotenv.config({path: path.resolve(__dirname, '.env')});
/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  fullyParallel: true,
  timeout: 0,
  testDir: './ricoh/sanity',
  workers: 2,
  reporter: [
    [
      "allure-playwright",
      {
        detail: true,
        history: true,
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
    baseURL: process.env.URL,
    headless: false,
    video: 'retain-on-failure',
    screenshot: {mode: 'only-on-failure', fullPage: true},
    launchOptions: {slowMo: 100, args: ['--start-maximized']},
  },
  projects: [
    {
      name: 'English',
      use: {
        language: process.env.ENGLISH,
        ...devices[process.env.DEVICE], deviceScaleFactor: undefined, channel: process.env.BROWSER, viewport: null
      }
    },
    {
      name: 'Chinese',
      use: {
        language: process.env.CHINESE,
        ...devices[process.env.DEVICE], deviceScaleFactor: undefined, channel: process.env.BROWSER, viewport: null
      },
    }
  ],
});

