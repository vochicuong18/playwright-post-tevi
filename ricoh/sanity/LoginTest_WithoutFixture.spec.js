const {test, expect} = require('@playwright/test');
const {default: HeaderPage} = require('../../src/pages/general/HeaderPage');
const {default: DataTest} = require('../../src/utilities/DataTest');
const {default: Navigate} = require('../../src/utilities/Navigate');
const {default: MyAccount} = require('../../src/pages/customer/MyAccount');

let page;
let headerPage;
let title
let customer1, customer2;
let loginPage;
let myAccount

test.beforeAll('Navigate to homepage', async ({browser}) => {
    page = await browser.newPage();
    headerPage = new HeaderPage(page)
    customer1 = DataTest.getCustomerTest();
    customer2 = DataTest.getCustomerTest2();
});

test.afterAll('Clean up', async () => {
    await page.close()
});

test('login with customer1 test', async () => {
    await test.step('home page title', async () => {
        await Navigate.navigateToHomePage(page)
        await headerPage.switchLanguage('English');
        title = await headerPage.getTitle();
    })
    await test.step('login', async () => {
        loginPage = await headerPage.navigateToLogin();
        myAccount = await loginPage.loginViaPassword(customer1)
        title = await page.title()
        await expect(title).toBe("My Account")
        await myAccount.checkContactInfo(customer1)
        await headerPage.signOut()
    })
})

test('login with customer2 test', async () => {
    await test.step('home page title', async () => {
        await Navigate.navigateToHomePage(page)
        await headerPage.switchLanguage('English');
        title = await headerPage.getTitle();
        await expect.soft(title).toBe("Home Page1")
    })
    await test.step('login', async () => {
        loginPage = await headerPage.navigateToLogin();
        myAccount = await loginPage.loginViaPassword(customer2)
        title = await page.title()
        await expect(title).toBe("My Account")
        await myAccount.checkContactInfo(customer2)
    })
})
