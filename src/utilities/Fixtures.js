import {test as baseTest, expect as baseExpect} from '@playwright/test';
import fs from "fs";
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
import SimpleProduct from "../entities/product/SimpleProduct";
import BundleProduct from "../entities/product/BundleProduct";
import BundleItem from "../entities/product/BundleItem";
import {paymentMethod} from '../entities/Payment';
import {shippingMethod} from '../entities/Shipping';

import Product from "../entities/product/Product";
import Customer from '../entities/Customer';
import Address from "../entities/Address";

const customerRawData = fs.readFileSync('src/data/customer.json', 'utf-8');
const productRawData = fs.readFileSync('src/data/product.json', 'utf-8')
const product = JSON.parse(productRawData)
const customer = JSON.parse(customerRawData);

const allure = require("allure-js-commons");

export const test = baseTest.extend({
    //Fixtures marked as "option: true" will get a value specified in the config, or fallback to the default value.
    language: ['en', {option: true}],
    page: async ({browser, language}, use) => {
        const page = await browser.newPage();
        await allure.tag(`${browser.browserType().name()} ${browser.version()}`)
        await Navigate.navigateToHomePage(page)
        let headerPage = new HeaderPage(page)
        await headerPage.acceptCookie()
        await headerPage.switchLanguage(language);
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

    simpleProduct: async ({language}, use) => {
        await use(new SimpleProduct.Builder()
            .setSku(product[language].simple_product.sku)
            .setName(product[language].simple_product.name)
            .setType(Product.ProductType.SIMPLE)
            .setPrice(product[language].simple_product.price)
            .setQty(product[language].simple_product.qty)
            .setURL(product[language].simple_product.url)
            .build())
    },

    bundleProduct: async ({language}, use) => {
        const jsonData = product[language].bundle_product
        const productList = [];
        let price = 0;
        const jsonBundleItems = jsonData.bundle_items;
        for (const jProductItem of jsonBundleItems) {
            const productItem = new BundleItem.Builder()
                .setName(jProductItem.name)
                .setSku(jProductItem.sku)
                .setPrice(jProductItem.price)
                .setQty(Math.floor(Math.random() * 3) + 1)
                .setLabel(jProductItem.label)
                .setBundleItemType(getBundleProductType(jProductItem.type))
                .build();

            price += productItem.price * productItem.qty;
            productList.push(productItem);
        }
        await use(new BundleProduct.Builder()
            .setSku(jsonData.sku)
            .setName(jsonData.name)
            .setPrice(price)
            .setType(Product.ProductType.BUNDLE)
            .setQty(1)
            .setURL(jsonData.url)
            .setListProducts(productList)
            .build())
    },

    customer: async ({language}, use) => {
        await use(new Customer.Builder().setEmail(customer[language].user1.email)
            .setFirstName(customer[language].user1.firstName)
            .setLastName(customer[language].user1.lastName)
            .setPassword(customer[language].user1.password)
            .setShippingAddress(getShippingAddressTest(language))
            .setBillingAddress(getBillingAddressTest(language))
            .build())
    },

    cod: async ({}, use) => {
        await use(paymentMethod.cashOnDelivery)
    },

    bestWay: async ({}, use) => {
        await use(shippingMethod.bestWay)
    },

    calculated: async ({simpleProduct, bundleProduct, cod}, use) => {
        const subTotal = simpleProduct.getPrice() * simpleProduct.getQty() + bundleProduct.getPrice() * bundleProduct.getQty();
        const shippingFee = shippingMethod.bestWay.fee;
        const grandTotal = subTotal + shippingFee;
        await use({subTotal, shippingFee, grandTotal});
    },


});

function getBundleProductType(type) {
    if (type === 'checkbox') {
        return BundleItem.Type.CHECKBOX;
    } else {
        return BundleItem.Type.NONE;
    }
}

function getShippingAddressTest(language) {
    return new Address.Builder()
        .setFlat(customer[language].user1.shippingAddress.flat)
        .setStreet(customer[language].user1.shippingAddress.street)
        .setArea(customer[language].user1.shippingAddress.area)
        .setCity(customer[language].user1.shippingAddress.city)
        .setDistrict(customer[language].user1.shippingAddress.district)
        .setPhoneNumber(customer[language].user1.shippingAddress.phoneNumber).build()
}

function getBillingAddressTest(language) {
    return new Address.Builder()
        .setFlat(customer[language].user1.billingAddress.flat)
        .setStreet(customer[language].user1.billingAddress.street)
        .setArea(customer[language].user1.billingAddress.area)
        .setCity(customer[language].user1.billingAddress.city)
        .setDistrict(customer[language].user1.billingAddress.district)
        .setPhoneNumber(customer[language].user1.billingAddress.phoneNumber).build()
}
