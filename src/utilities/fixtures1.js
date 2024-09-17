const {paymentMethod} = require("../entities/Payment");
const {shippingMethod} = require("../entities/Shipping");
const {HeaderPage} = require("../pages/general/HeaderPage");
const {DataTest} = require("../utilities/DataTest");


const fixtures = {
    setup: async ({ browser }, use) => {
        const page = await browser.newPage();
        const headerPage = new HeaderPage(page);
        const customer = DataTest.getCustomerTest();
        const product = DataTest.getSimpleProductTest();
        const cod = paymentMethod.cashOnDelivery;
        const shipping = shippingMethod.bestWay

        await use({ page, headerPage, customer, product, cod, shipping });
    }
};

module.exports = fixtures;