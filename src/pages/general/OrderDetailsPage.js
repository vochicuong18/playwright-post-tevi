import PriceUtility from "../../utilities/PriceUtility";
import {expect} from "../../utilities/Fixtures";
import StringUtility from "../../utilities/StringUtility";
import {test} from "@playwright/test";
import AssertUtility from "../../utilities/AssertUtility";

export default class OrderDetailsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.orderNumber = page.locator("span[data-ui-id='page-title-wrapper']")
        this.subTotal = page.locator('tr.subtotal span.price')
        this.shippingFee = page.locator('tr.shipping span.price')
        this.grandTotal = page.locator('tr.grand_total span.price')
        this.shippingAddress = page.locator('div.box-order-shipping-address address')
        this.billingAddress = page.locator('div.box-order-billing-address address')
        this.paymentMethod = page.locator('div.box-order-billing-method div.box-content')
        this.productItem = (productName) => {
            return page.locator(`//tr[contains(@id, 'order-item-row')]//strong[text()='${productName}']`)
        }
        this.productSubtotal = (productName) => {
            return page.locator(`//strong[text()='${productName}']/ancestor::tr//td[@class='col subtotal']//span[@class='price']`)
        }
        this.shippingMethod = page.locator('div.box.box-order-shipping-method div.box-content')

    }

    async checkProduct(product) {
        await test.step(`Check product ${product.getName()}`, async () => {
            let priceGui = await this.productSubtotal(product.getName()).textContent()
            let priceData = await PriceUtility.convertPriceToString(product.getPrice() * product.getQty())
            await AssertUtility.assertTrue(await this.productItem(product.getName()).isVisible(), `Check ${product.getName()} displayed`)
            await AssertUtility.assertEquals(priceGui, priceData, "Check product grand total")
        })

    }

    async checkSubtotal(subtotal) {
        let gui = await this.subTotal.textContent()
        let data = await PriceUtility.convertPriceToString(subtotal)
        await AssertUtility.assertEquals(gui, data, "Check subtotal")
    }

    async checkShippingFee(shippingFee) {
        let gui = await this.shippingFee.textContent()
        let data = await PriceUtility.convertPriceToString(shippingFee)
        await AssertUtility.assertEquals(gui, data, "Check order shipping fee")
    }

    async checkGrandTotal(grandTotal) {
        let gui = await this.grandTotal.textContent()
        let data = await PriceUtility.convertPriceToString(grandTotal)
        await AssertUtility.assertEquals(gui, data, "Check order grand total")
    }

    async checkShippingAddress(customer) {
        let gui = await this.shippingAddress.textContent()
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  ")).trim()
        let data = this.formatAddress(customer, 'shipping')
        await AssertUtility.assertEquals(gui, data, "Check shipping address")
    }

    async checkBillingAddress(customer) {
        let gui = await this.billingAddress.textContent()
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  ")).trim()
        let data = this.formatAddress(customer, 'billing')
        await AssertUtility.assertEquals(gui, data, "Check billing address")
    }

    async checkShippingMethod(shippingMethod) {
        let gui = await this.shippingMethod.textContent()
        await AssertUtility.assertEquals(gui.trim(), shippingMethod, "Check shipping method")
    }

    async checkPaymentMethod(paymentMethod) {
        let gui = await this.paymentMethod.textContent()
        await AssertUtility.assertEquals(gui.trim(), paymentMethod, "Check payment method")
    }

    formatAddress(customer, addressType) {
        const {firstName, lastName} = customer;
        const {
            flat,
            street,
            district,
            area,
            city,
            phoneNumber
        } = addressType === 'shipping' ? customer.getShippingAddress() : customer.getBillingAddress();
        return `${firstName} ${lastName}${flat}${street}, ${district}, ${area}, ${city}T: ${phoneNumber}`;
    }
}
