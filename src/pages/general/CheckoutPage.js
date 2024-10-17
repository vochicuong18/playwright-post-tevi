import {expect, test} from "@playwright/test";
import SuccessPage from "./SuccessPage";
import PriceUtility from "../../utilities/PriceUtility";
import StringUtility from "../../utilities/StringUtility";
import WaitUtility from "../../utilities/WaitUtility";
import AssertUtility from "../../utilities/AssertUtility";

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
        this.btnCheckout = page.locator("div.payment-method._active button[data-bind*='placeOrder']")
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
        await AssertUtility.assertEquals(gui, data, "Check subtotal")
    }

    async checkShippingFree(shippingFee) {
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
        gui = StringUtility.removeLines(StringUtility.removeRedundantCharacter(gui, "  "))
            .replace("Billing address", "")
            .replace("Edit", "").trim()
        let data = this.formatAddress(customer, 'billing')
        await AssertUtility.assertEquals(gui, data, "Check billing address")
    }

    async selectPaymentMethod(paymentMethod) {
        await test.step(`Select ${paymentMethod} method`, async () => {
            await this.cbPaymentMethod(paymentMethod).click()
            await waitUtility.waitForNotPresentOf(this.loadingMask)
            await waitUtility.waitForNotPresentOf(this.summaryLoadingMask)
        })
    }

    async agreeTerm() {
        await test.step("Agree term", async () => {
            await this.cbCheckoutAgreement.click()
        })
    }

    async placeOrder() {
        await test.step("Place order", async () => {
            await this.btnCheckout.click()
            await this.page.waitForURL("**/checkout/onepage/success/")
            await this.page.waitForLoadState()
        })
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
        return `${firstName}  ${lastName}   ${flat} ${street},  ${district},  ${area}  ${city} ${phoneNumber}`;
    }
}
