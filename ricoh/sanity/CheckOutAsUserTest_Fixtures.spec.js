import {test} from "../../src/utilities/fixtures1";
test('Checkout as user', async ({language, headerPage, loginPage, myAccountPage, productListPage, productDetailsPage, shoppingCartPage, shippingPage, checkoutPage, successPage, orderDetailsPage ,customer, simpleProduct, bundleProduct, cod, bestWay, calculated:{subTotal, shippingFee, grandTotal} }) => {

    await test.step('Login', async () => {
        await headerPage.switchLanguage(language.en);
        await headerPage.navigateToLogin();
        await loginPage.loginViaPassword(customer)
        await myAccountPage.checkContactInfo(customer)
    })

    await test.step('Check cart empty', async () => {
        await headerPage.viewMiniCart()
        if (!await headerPage.isCartEmpty()) {
            await headerPage.viewShoppingCart()
            await shoppingCartPage.empty()
        }
    })

    await test.step('Add product to cart', async () => {
        await headerPage.searchProduct(simpleProduct)
        await productListPage.goToProductDetails(simpleProduct)
        await productDetailsPage.addToCart(simpleProduct)

        await headerPage.searchProduct(bundleProduct)
        await productListPage.goToProductDetails(bundleProduct)
        await productDetailsPage.addToCart(bundleProduct)
    })

    await test.step('Check shopping cart', async () => {
        await headerPage.viewMiniCart()
        await headerPage.viewShoppingCart()
        await shoppingCartPage.checkProduct(simpleProduct)
        await shoppingCartPage.checkProduct(bundleProduct)
        await shoppingCartPage.checkSubTotal(subTotal)
        await shoppingCartPage.checkGrandTotal(grandTotal)
    })

    await test.step('Shipping', async () => {
        await shoppingCartPage.goToShippingPage()
        await shippingPage.selectShippingMethod(bestWay.code)
    })

    await test.step('Payment', async () => {
        await shippingPage.gotoCheckOutPage()
        await checkoutPage.checkSubTotal(subTotal)
        await checkoutPage.checkShippingFree(shippingFee)
        await checkoutPage.checkGrandTotal(grandTotal)
        await checkoutPage.checkShippingAddress(customer)
        await checkoutPage.checkBillingAddress(customer)
        await checkoutPage.selectPaymentMethod(cod.code)
        await checkoutPage.agreeTerm()
        await checkoutPage.placeOrder()
    })

    await test.step('Check order details', async () => {
        await successPage.goToOrderDetailPage()
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
