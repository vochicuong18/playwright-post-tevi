import {test as baseTest} from '@playwright/test';

const {default: DataTest} = require('../../src/utilities/DataTest');
const {default: HeaderPage} = require('../../src/pages/general/HeaderPage');
import {paymentMethod} from '../entities/Payment';
import {shippingMethod} from '../entities/Shipping';

const test = baseTest.extend({
    page: async ({browser}, use) => {
        const page = await browser.newPage();
        await use(page);
        await page.close();
    },
    headerPage: async ({page}, use) => {
        const headerPage = new HeaderPage(page);
        await use(headerPage);
    },
    customer: async (_, use) => {
        const customer = DataTest.getCustomerTest();
        await use(customer);
    },
    simpleProduct: async (_, use) => {
        const simpleProduct = DataTest.getSimpleProductTest();
        await use(simpleProduct);
    },
    bundleProduct: async (_, use) => {
        const bundleProduct = DataTest.getBundleProductTest();
        await use(bundleProduct);
    },
    cod: async (_, use) => {
        const cod = paymentMethod.cashOnDelivery;
        await use(cod);
    },
    bestWay: async (_, use) => {
        const shipping = shippingMethod.bestWay;
        await use(shipping);
    },
    subTotal: [null, {option: true}],
    shippingFee: [null, {option: true}],
    grandTotal: [null, {option: true}]
});
export default test;
