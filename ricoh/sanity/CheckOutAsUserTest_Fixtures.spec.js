import test from "../../src/utilities/fixtures1";
const {default: Navigate} = require('../../src/utilities/Navigate')
/** @type {import('@playwright/test').Page} */

let loginPage
let myAccountPage
let productListPage
let productDetailsPage
let shoppingCartPage
let shippingPage
let checkoutPage
let successPage
let orderDetailsPage

test('Checkout as user with simple product', async ({ page, headerPage, customer, simpleProduct, bundleProduct, cod, bestWay }) => {
    let subTotal, shippingFee, grandTotal;
    subTotal = simpleProduct.getPrice() * simpleProduct.getQty() + bundleProduct.getPrice() * bundleProduct.getQty();
    shippingFee = bestWay.fee;
    grandTotal = subTotal + shippingFee;

    await test.step('Login', async () => {
        await Navigate.navigateToHomePage(page)
        await headerPage.switchLanguage('English');
        loginPage = await headerPage.navigateToLogin();
        myAccountPage = await loginPage.loginViaPassword(customer)
        await myAccountPage.checkContactInfo(customer)
    })

    await test.step('Check cart empty', async () => {
        await headerPage.viewMiniCart()
        if (!await headerPage.isEmptyCartTitleDisplayed()) {
            shoppingCartPage = await headerPage.viewShoppingCart()
            await shoppingCartPage.empty()
        }
    })

    await test.step('Add product to cart', async () => {
        productListPage = await headerPage.searchProduct(simpleProduct)
        productDetailsPage = await productListPage.goToProductDetails(simpleProduct)
        await productDetailsPage.addToCart(simpleProduct)

        productListPage = await headerPage.searchProduct(bundleProduct)
        productDetailsPage = await productListPage.goToProductDetails(bundleProduct)
        await productDetailsPage.addToCart(bundleProduct)
        await calculate()
    })

    await test.step('Check shopping cart', async () => {
        await headerPage.viewMiniCart()
        shoppingCartPage = await headerPage.viewShoppingCart()
        await shoppingCartPage.checkProduct(simpleProduct)
        await shoppingCartPage.checkProduct(bundleProduct)
        await shoppingCartPage.checkSubTotal(subTotal)
        await shoppingCartPage.checkGrandTotal(grandTotal)
    })

    await test.step('Shipping', async () => {
        shippingPage = await shoppingCartPage.goToShippingPage()
        await shippingPage.selectShippingMethod(bestWay.code)
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
        await orderDetailsPage.checkProduct(simpleProduct)
        await orderDetailsPage.checkProduct(bundleProduct)
        await orderDetailsPage.checkSubtotal(subTotal)
        await orderDetailsPage.checkShippingFee(shippingFee)
        await orderDetailsPage.checkGrandTotal(grandTotal)
        await orderDetailsPage.checkShippingAddress(customer)
        await orderDetailsPage.checkBillingAddress(customer)
        await orderDetailsPage.checkShippingMethod(bestWay.string)
        await orderDetailsPage.checkPaymentMethod(cod.string)
    })
})
