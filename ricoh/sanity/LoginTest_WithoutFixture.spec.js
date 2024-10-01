const {test, expect} = require('@playwright/test');
const {default: HomePage} = require('../../src/pages/general/HomePage');
const {default: DataTest} = require('../../src/utilities/DataTest');
const {default: Navigate} = require('../../src/utilities/Navigate');
const {default: MyAccount} = require('../../src/pages/customer/MyAccount');

test.describe.configure({mode: 'serial'});

/** @type {import('@playwright/test').Page} */
let page;
let homePage;
let title
let customer;
let loginPage;
let myAccount

test.beforeAll('Navigate to homepage', async ({browser}) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    customer = DataTest.getCustomerTest();
});

test.afterAll('Clean up', async () => {
    await page.close()
});

test('login test', async () => {
    await test.step('home page title', async () => {
        await Navigate.navigateToHomePage(page)
        await homePage.switchLanguage('English');
        title = await homePage.getTitle();
        await expect(title).toBe("Home Page")
    })
    await test.step('login', async () => {
        loginPage = await homePage.navigateToLogin();
        myAccount = await loginPage.loginViaPassword(customer)
        title = await page.title()
        await expect(title).toBe("My Account")
        await myAccount.checkContactInfo(customer)
    })
})
