import {test, expect} from "@playwright/test";

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
let successPage
let orderDetailsPage
let customer
let product
let cod
let subTotal
let shippingFee
let grandTotal

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

    //add product to cart
    productListPage = await headerPage.searchProduct(product)
    productDetailsPage = await productListPage.goToProductDetails(product)
    await productDetailsPage.addToCart()
    await calculate()

    //shopping cart page
    await headerPage.viewMiniCart()
    shoppingCartPage = await headerPage.viewShoppingCart()
    await shoppingCartPage.checkProduct(product)
    await shoppingCartPage.checkSubTotal(subTotal)
    await shoppingCartPage.checkGrandTotal(grandTotal)

    //shipping page
    shippingPage = await shoppingCartPage.goToShippingPage()

    //checkout page
    checkoutPage = await shippingPage.gotoCheckOutPage()
    await checkoutPage.checkSubTotal(subTotal)
    await checkoutPage.checkShippingFree(shippingFee)
    await checkoutPage.checkGrandTotal()
    await checkoutPage.checkShippingAddress(customer)
    await checkoutPage.checkBillingAddress(customer)
    await checkoutPage.selectPaymentMethod(cod)
    await checkoutPage.agreeTerm()

    //check order details
    await successPage = checkoutPage.placeOrder()
    await orderDetailsPage = successPage.goToOrderDetailPage()
    await orderDetailsPage.checkProduct(product)
    await orderDetailsPage.checkSubtotal(subTotal)
    await orderDetailsPage.checkShippingFee(shippingFee)
    await orderDetailsPage.checkGrandTotal(grandTotal)
    await orderDetailsPage.checkShippingAddress(customer)
    await orderDetailsPage.checkBillingAddress(customer)
    await orderDetailsPage.checkPaymentMethod(paymentMethod)


})

// test('Clear cart', async () => {
//     // console.log("After check fail1")
// })
//
// test('Add product to cart', async () => {
//     productListPage = await headerPage.searchProduct(product)
//     productDetailsPage = await productListPage.goToProductDetails(product)
//     await productDetailsPage.addToCart()
//     await calculate()
// })
//
// test('Shopping cart', async () => {
//     await headerPage.viewMiniCart()
//     shoppingCartPage = await headerPage.viewShoppingCart()
//     await shoppingCartPage.checkProduct(product)
//     await shoppingCartPage.checkSubTotal(subTotal)
//     await shoppingCartPage.checkGrandTotal(grandTotal)
// })
//
// test('Shipping', async () => {
//     shippingPage = await shoppingCartPage.goToShippingPage()
// })
//
// test('Checkout', async () => {
//     checkoutPage = await shippingPage.gotoCheckOutPage()
//     // //check summary
//     await checkoutPage.selectPaymentMethod(cod)
//     await checkoutPage.agreeTerm()
//     await checkoutPage.placeOrder()
// })

async function calculate() {
    subTotal = product.getPrice() * product.getQty()
    shippingFee = 100
    grandTotal = subTotal + shippingFee
}
