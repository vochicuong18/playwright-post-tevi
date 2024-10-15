import CheckoutPage from "./CheckoutPage";
import WaitUtility from "../../utilities/WaitUtility";
import {test} from "@playwright/test";

let waitUtility

export default class ShippingPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.btnNext = page.locator("button[data-role='opc-continue']")
        this.shippingMethod = (shippingMethod) => {
            return page.locator(`input[value='${shippingMethod}']`)
        }
        this.loadingMask = page.locator('div.checkout-loader')
        this.summaryLoadingMask = page.locator('div.opc-block-summary div.loading-mask')
    }

    async gotoCheckOutPage() {
        await test.step(`Go to checkout page`, async () => {
            await this.btnNext.click()
            await waitUtility.waitForURLEndWith("/checkout/#payment")
            await this.page.waitForLoadState()
            await waitUtility.waitForNotPresentOf(this.loadingMask)
            await waitUtility.waitForNotPresentOf(this.summaryLoadingMask)
            await this.page.waitForLoadState('domcontentloaded')
        })

        return new CheckoutPage(this.page)
    }

    // async selectShippingAddress(address) {
    //
    // }

    async selectShippingMethod(method) {
        await test.step(`Select ${method} shipping method`, async () => {
            await this.shippingMethod(method).click()
        })
    }
}