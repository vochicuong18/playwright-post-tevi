import {test as baseTest, expect as baseExpect} from '@playwright/test';

import DataTest from "./DataTest";
import Navigate from "./Navigate";
import HeaderPage from "../pages/general/HeaderPage";
import LoginPage from "../pages/general/LoginPage";
import MyAccount from "../pages/customer/MyAccount";
import ProductListPage from "../pages/product/ProductListPage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import ShoppingCartPage from "../pages/general/ShoppingCartPage";
import ShippingPage from "../pages/general/ShippingPage";
import CheckoutPage from "../pages/general/CheckoutPage";
import SuccessPage from "../pages/general/SuccessPage";
import OrderDetailsPage from "../pages/general/OrderDetailsPage";
import {paymentMethod} from '../entities/Payment';
import {shippingMethod} from '../entities/Shipping';

const allure = require("allure-js-commons");

export const test = baseTest.extend({
    //Fixtures marked as "option: true" will get a value specified in the config,
    // or fallback to the default value.
    language: ['English', {option: true}],
    page: async ({browser}, use) => {
        const page = await browser.newPage();
        await allure.tag(`${browser.browserType().name()} ${browser.version()}`)
        await Navigate.navigateToHomePage(page)
        await use(page);
    },

    headerPage: async ({page}, use) => {
        await use(new HeaderPage(page));
    },

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page))
    },

    myAccountPage: async ({page}, use) => {
        await use(new MyAccount(page))
    },

    productListPage: async ({page}, use) => {
        await use(new ProductListPage(page))
    },

    productDetailsPage: async ({page}, use) => {
        await use(new ProductDetailsPage(page))
    },

    shoppingCartPage: async ({page}, use) => {
        await use(new ShoppingCartPage(page))
    },

    shippingPage: async ({page}, use) => {
        await use(new ShippingPage(page))
    },

    checkoutPage: async ({page}, use) => {
        await use(new CheckoutPage(page))
    },

    successPage: async ({page}, use) => {
        await use(new SuccessPage(page))
    },

    orderDetailsPage: async ({page}, use) => {
        await use(new OrderDetailsPage(page))
    },

    customer: async ({}, use) => {
        await use(DataTest.getCustomerTest())
    },

    simpleProduct: async ({}, use) => {
        await use(DataTest.getSimpleProductTest())
    },

    bundleProduct: async ({}, use) => {
        await use(DataTest.getBundleProductTest())
    },

    cod: async ({}, use) => {
        await use(paymentMethod.cashOnDelivery)
    },

    bestWay: async ({}, use) => {
        await use(shippingMethod.bestWay)
    },

    calculated: async ({simpleProduct, bundleProduct, cod}, use) => {
        const subTotal = simpleProduct.getPrice() * simpleProduct.getQty() * 2 + bundleProduct.getPrice() * bundleProduct.getQty();
        const shippingFee = shippingMethod.bestWay.fee;
        const grandTotal = subTotal + shippingFee;
        await use({subTotal, shippingFee, grandTotal});
    },
});

// export const expect = baseExpect.extend({
//     screenshot: async page => {
//         await page.screenshot({path: `abc${Math.floor(Math.random() * 100) + 1}.png`})
//     }
// })
