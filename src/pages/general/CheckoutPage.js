import {expect} from "@playwright/test";
import SuccessPage from "./SuccessPage";
import PriceUtility from "../../utilities/PriceUtility";
import StringUtility from "../../utilities/StringUtility";
import WaitUtility from "../../utilities/WaitUtility";

let waitUtility

export default class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.cbPaymentMethod = (paymentMethod) => {
            return page.locator(`//input[@id='${paymentMethod}']`)
        }
        this.cbCheckoutAgreement = page.locator('div.payment-method._active div.checkout-agreements')
        this.btnCheckout = page.getByRole('button', {name: 'Place Order'})
        this.subTotal = page.locator('tr.totals.sub span.price')
        this.shippingFee = page.locator('tr.totals.shipping.excl span.price')
        this.grandTotal = page.locator('tr.grand.totals span.price')
        this.shippingAddress = page.locator("(//div[@class='shipping-information-content'])[1]")
        this.billingAddress = page.locator("(//div[@class='billing-address-details'])[1][not(self::h3 or self::button)]")
        this.loadingMask = page.locator('div.checkout-loader')
        this.summaryLoadingMask = page.locator('div.opc-block-summary div.loading-mask')
    }

    async checkSubTotal(subtotal) {
        let gui = await this.subTotal.textContent()
        let data = await PriceUtility.convertPriceToString(subtotal)
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingFree(shippingFee) {
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
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  "))
            .replace("Billing address", "")
            .replace("Edit", "").trim()
        let data = this.formatAddress(customer, 'billing')
        await expect.soft(gui).toEqual(data)
    }

    async selectPaymentMethod(paymentMethod) {
        await this.cbPaymentMethod(paymentMethod).click()
        await waitUtility.waitForNotPresentOf(this.loadingMask)
        await waitUtility.waitForNotPresentOf(this.summaryLoadingMask)
    }

    async agreeTerm() {
        await this.cbCheckoutAgreement.click()
    }

    async placeOrder() {
        await this.btnCheckout.click()
        await this.page.waitForURL("**/checkout/onepage/success/")
        await this.page.waitForLoadState()
        return new SuccessPage(this.page)
    }

    formatAddress(customer, addressType) {
        const { firstName, lastName } = customer;
        const { flat, street, district, area, city, phoneNumber } = addressType === 'shipping' ? customer.getShippingAddress() : customer.getBillingAddress();
        return `${firstName}  ${lastName}   ${flat} ${street},  ${district},  ${area}  ${city} ${phoneNumber}`;
    }
}