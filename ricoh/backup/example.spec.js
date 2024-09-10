const { test, expect } = require('@playwright/test');
const { default: HomePage } = require('../../src/pages/general/HomePage');

test.describe.configure({ mode: 'serial' });

/** @type {import('@playwright/test').Page} */
let page;
let homePage;
let title = "";

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  homePage = new HomePage(page);
});

test.afterAll(async () => {
  await page.close();
});



test('runs second', async () => {
  expect(await homePage.getURL()).toBe(title)
  await page.getByText('Get Started').click();
});