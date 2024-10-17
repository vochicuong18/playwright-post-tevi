import {test} from "../../src/utilities/Fixtures";

test('login with customer1 test', async ({headerPage, loginPage, myAccountPage, customer1}) => {
    await test.step('login', async () => {
        console.log()
        await headerPage.navigateToLogin();
        await loginPage.loginViaPassword(customer1)
        await myAccountPage.checkContactInfo(customer1)
        await headerPage.signOut()
    })
})

test('login with customer2 test', async ({headerPage, loginPage, myAccountPage, customer2}) => {
    await test.step('login', async () => {
        await headerPage.navigateToLogin();
        await loginPage.loginViaPassword(customer2)
        await myAccountPage.checkContactInfo(customer2)
    })
})
