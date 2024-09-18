import {test as baseTest} from '@playwright/test';

const {default: DataTest} = require('../../src/utilities/DataTest');
const {default: HeaderPage} = require('../../src/pages/general/HeaderPage');
import {paymentMethod} from '../entities/Payment';
import {shippingMethod} from '../entities/Shipping';

const test = baseTest.extend({
    page: async ({browser}, use) => {
        const page = await browser.newPage();
        await use(page);
    },
    headerPage: async ({page}, use) => {
        await use(new HeaderPage(page));
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
        const subTotal = simpleProduct.getPrice() * simpleProduct.getQty() + bundleProduct.getPrice() * bundleProduct.getQty();
        const shippingFee = shippingMethod.bestWay.fee;
        const grandTotal = subTotal + shippingFee;
        await use({subTotal, shippingFee, grandTotal});
    },
});
export default test;
