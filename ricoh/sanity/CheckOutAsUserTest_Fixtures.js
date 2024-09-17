import {test as base} from "@playwright/test";

const {default: DataTest} = require('../../src/utilities/DataTest')
const {default: Navigate} = require('../../src/utilities/Navigate')
const {default: HeaderPage} = require('../../src/pages/general/HeaderPage')
const fixtures = require('../../src/utilities/fixtures1');
import {paymentMethod} from '../../src/entities/Payment'
import {shippingMethod} from "../../src/entities/Shipping";

// let page
// let headerPage
let loginPage
let myAccountPage
let productListPage
let productDetailsPage
let shoppingCartPage
let shippingPage
let checkoutPage
let successPage
let orderDetailsPage
// let customer
// let product
// let cod
let subTotal
let shippingFee
let grandTotal

const test = base.extend(fixtures);


test('Checkout as user with simple product', async ({ page, headerPage, customer, product, cod, shipping }) => {

    await test.step('Login', async () => {
        await Navigate.navigateToHomePage(page)
        await headerPage.switchLanguage('English');
        loginPage = await headerPage.navigateToLogin();
        myAccountPage = await loginPage.loginViaPassword(customer)
        await myAccountPage.checkContactInfo(customer)
    })

    await test.step('Add product to cart', async () => {
        productListPage = await headerPage.searchProduct(product)
        productDetailsPage = await productListPage.goToProductDetails(product)
        await productDetailsPage.addToCart()
        await calculate()
    })

    await test.step('Check shopping cart', async () => {
        await headerPage.viewMiniCart()
        shoppingCartPage = await headerPage.viewShoppingCart()
        await shoppingCartPage.checkProduct(product)
        await shoppingCartPage.checkSubTotal(subTotal)
        await shoppingCartPage.checkGrandTotal(grandTotal)
    })

    await test.step('Shipping', async () => {
        shippingPage = await shoppingCartPage.goToShippingPage()
        await shippingPage.selectShippingMethod(shipping)
    })

    await test.step('Payment', async () => {
        checkoutPage = await shippingPage.gotoCheckOutPage()
        await checkoutPage.checkSubTotal(subTotal)
        await checkoutPage.checkShippingFree(shippingFee)
        await checkoutPage.checkGrandTotal(grandTotal)
        await checkoutPage.checkShippingAddress(customer)
        await checkoutPage.checkBillingAddress(customer)
        await checkoutPage.selectPaymentMethod(cod.code)
        await checkoutPage.agreeTerm()
        successPage = await checkoutPage.placeOrder()
    })

    await test.step('Check order details', async () => {
        orderDetailsPage = await successPage.goToOrderDetailPage()
        await orderDetailsPage.checkProduct(product)
        await orderDetailsPage.checkSubtotal(subTotal)
        await orderDetailsPage.checkShippingFee(shippingFee)
        await orderDetailsPage.checkGrandTotal(grandTotal)
        await orderDetailsPage.checkShippingAddress(customer)
        await orderDetailsPage.checkBillingAddress(customer)
        await orderDetailsPage.checkShippingMethod(shippingMethod.bestWay.string)
        await orderDetailsPage.checkPaymentMethod(cod.string)
    })
})

async function calculate() {
    subTotal = product.getPrice() * product.getQty()
    shippingFee = shippingMethod.bestWay.fee
    grandTotal = subTotal + shippingFee
}
