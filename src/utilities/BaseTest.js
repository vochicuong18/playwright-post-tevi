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

export const test = baseTest.extend({
    //Fixtures marked as "option: true" will get a value specified in the config, or fallback to the default value.
    language: ['English', {option: true}],
    page: async ({browser, language}, use) => {
        let page = await browser.newPage();
        let headerPage = new HeaderPage(page)
        await allure.tag(`${browser.browserType().name()} ${browser.version()}`)
        await NavigateUtility.navigateToHomePage(page)
        await headerPage.acceptCookie()
        await headerPage.switchLanguage(language);
        await use(page);
        await page.close()
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
    }
})