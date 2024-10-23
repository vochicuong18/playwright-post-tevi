import {test as baseTest} from "@playwright/test";
import NavigateUtility from "./NavigateUtility";
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

const allure = require("allure-js-commons");
let page
export const test = baseTest.extend({
    //Fixtures marked as "option: true" will get a value specified in the config, or fallback to the default value.
    language: ['English', {option: true}],
    browser: async ({ browser }, use) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await NavigateUtility.navigateToHomePage(page);
        await use(page);
    },

    headerPage: async ({language}, use) => {
        const headerPage = new HeaderPage(page);
        await headerPage.acceptCookie();
        await headerPage.switchLanguage(language);
        await use(headerPage);
    },

    loginPage: async ({}, use) => {
        await use(new LoginPage(page))
    },

    myAccountPage: async ({}, use) => {
        await use(new MyAccount(page))
    },

    productListPage: async ({}, use) => {
        await use(new ProductListPage(page))
    },

    productDetailsPage: async ({}, use) => {
        await use(new ProductDetailsPage(page))
    },

    shoppingCartPage: async ({}, use) => {
        await use(new ShoppingCartPage(page))
    },

    shippingPage: async ({}, use) => {
        await use(new ShippingPage(page))
    },

    checkoutPage: async ({}, use) => {
        await use(new CheckoutPage(page))
    },

    successPage: async ({}, use) => {
        await use(new SuccessPage(page))
    },

    orderDetailsPage: async ({}, use) => {
        await use(new OrderDetailsPage(page))
    }
})
