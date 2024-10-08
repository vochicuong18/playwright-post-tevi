import { expect } from "@playwright/test";
import test from "../../src/utilities/Fixtures";

const title = 'Home Page'




test.beforeEach('Navigate to homepage', async ({page}) => {
    await page.goto('/');
});

test.afterEach('Clean up', async ({page}) => {
    await page.close()
}) ;

test('home page title', async ({homePage}) => {
    
    expect(await homePage.getTitle()).toBe(title)
    expect(await homePage.getURL()).toBe(title)
});
