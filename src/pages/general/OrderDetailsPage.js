import PriceUtility from "../../utilities/PriceUtility";
import {expect} from "../../utilities/fixtures1";
import StringUtility from "../../utilities/StringUtility";

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
        let priceGui = await this.productSubtotal(product.getName()).textContent()
        let priceData = await PriceUtility.convertPriceToString(product.getPrice() * product.getQty())
        await expect.soft(this.productItem(product.getName())).toBeVisible()
        await expect.soft(priceGui).toEqual(priceData)
    }

    async checkSubtotal(subtotal) {
        let gui = await this.subTotal.textContent()
        let data = await PriceUtility.convertPriceToString(subtotal)
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingFee(shippingFee) {
        let gui = await this.shippingFee.textContent()
        let data = await PriceUtility.convertPriceToString(shippingFee)
        await expect.soft(gui).toEqual(data)
    }

    async checkGrandTotal(grandTotal) {
        let gui = await this.grandTotal.textContent()
        let data = await PriceUtility.convertPriceToString(grandTotal)
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingAddress(customer) {
        let gui = await this.shippingAddress.textContent()
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  ")).trim()
        let data = this.formatAddress(customer, 'shipping')
        await expect.soft(gui).toEqual(data)
    }

    async checkBillingAddress(customer) {
        let gui = await this.billingAddress.textContent()
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  ")).trim()
        let data = this.formatAddress(customer, 'billing')
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingMethod(shippingMethod) {
        let gui = await this.shippingMethod.textContent()
        await expect.soft(gui.trim()).toEqual(shippingMethod)
    }

    async checkPaymentMethod(paymentMethod) {
        let gui = await this.paymentMethod.textContent()
        await expect.soft(gui.trim(), "Check payment method").toEqual(paymentMethod)
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