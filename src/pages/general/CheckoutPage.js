import StringUtility from "../../utilities/StringUtility";
import {expect} from "@playwright/test";
import SuccessPage from "./SuccessPage";

export default class CheckoutPage {
    constructor(page) {
        this.page = page
        this.cbPaymentMethod = (paymentMethod) => {
            return page.locator(`//input[@id='${paymentMethod}']`)
        }
        this.cbCheckoutAgreement = page.locator('div.payment-method._active div.checkout-agreements')
        this.btnCheckout = page.getByRole('button', {name: 'Place Order'})
        this.subTotal = page.locator('tr.totals.sub span.price')
        this.shippingFee = page.locator('tr.totals.shipping.excl span.price')
        this.grandTotal = page.locator('tr.grand.totals span.price')
    }

    async checkSubTotal(subtotal) {
        let gui = await this.subTotal.textContent()
        let data = await StringUtility.convertPriceToString(subtotal)
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingFree(shippingFee) {
        let gui = await this.shippingFee.textContent()
        let data = await StringUtility.convertPriceToString(shippingFee)
        await expect.soft(gui).toEqual(data)
    }

    async checkGrandTotal(grandTotal) {
        let gui = await this.grandTotal.textContent()
        let data = await StringUtility.convertPriceToString(grandTotal)
        await expect.soft(gui).toEqual(data)
    }

    async checkShippingAddress(customer) {

    }

    async checkBillingAddress(customer) {

    }

    async selectPaymentMethod(paymentMethod) {
        await this.cbPaymentMethod(paymentMethod).click()
    }

    async agreeTerm() {
        await this.cbCheckoutAgreement.click()
    }

    async placeOrder() {
        await this.btnCheckout.click()
        await page.waitForURL("**/checkout/onepage/success/")
        await page.waitForLoadState()
        return new SuccessPage(this.page)
    }
}