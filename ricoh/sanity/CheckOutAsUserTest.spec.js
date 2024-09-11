const {test, expect} = require('@playwright/test')
const {default: DataTest} = require('../../src/utilities/DataTest')
const {default: Navigate} = require('../../src/utilities/Navigate')
const {default: HeaderPage} = require('../../src/pages/general/HeaderPage')
import {paymentMethod} from '../../src/entities/Payment'

test.describe.configure({mode: 'serial'})

/** @type {import('@playwright/test').Page} */

let page
let headerPage
let loginPage
let myAccountPage
let productListPage
let productDetailsPage
let shoppingCartPage
let shippingPage
let checkoutPage
let customer
let product
let cod

test.beforeAll('Navigate to Home Page', async ({browser}) => {
    page = await browser.newPage()
    headerPage = new HeaderPage(page)
    customer = DataTest.getCustomerTest()
    product = DataTest.getProductTest()
    cod = paymentMethod.cashOnDelivery
})

test.afterAll('Clean up', async () => {
    await page.close()
})


test('Login', async () => {
    await Navigate.navigateToHomePage(page)
    await headerPage.switchLanguage('English');
    loginPage = await headerPage.navigateToLogin();
    myAccountPage = await loginPage.loginViaPassword(customer)
    await myAccountPage.checkContactInfo(customer)
})

test('Add product to cart', async () => {
    productListPage = await myAccountPage.searchProduct(product)
    productDetailsPage = await productListPage.goToProductDetails(product)
    await productDetailsPage.addToCart()


})

test('Shopping cart', async () => {
    await headerPage.viewMiniCart()
    shoppingCartPage = await headerPage.viewShoppingCart()
    //check summary

})

test('Shipping', async () => {
    shippingPage = await shoppingCartPage.goToShippingPage()
    //select address, shipping method
})

test('Checkout', async () => {
    checkoutPage = await shippingPage.gotoCheckOutPage()
    //check summary
    await checkoutPage.selectPaymentMethod(cod)
    await checkoutPage.agreeTerm()
    await checkoutPage.placeOrder()
})