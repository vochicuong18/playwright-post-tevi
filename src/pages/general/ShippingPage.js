import CheckoutPage from "./CheckoutPage";
import WaitUtility from "../../utilities/WaitUtility";

let waitUtility

export default class ShippingPage {
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
        await this.btnNext.click()
        await waitUtility.waitForURLEndWith("/checkout/#payment")
        await this.page.waitForLoadState()
        await waitUtility.waitForNotPresentOf(this.loadingMask)
        await waitUtility.waitForNotPresentOf(this.summaryLoadingMask)
        return new CheckoutPage(this.page)
    }

    // async selectShippingAddress(address) {
    //
    // }

    async selectShippingMethod(method) {
        await this.shippingMethod(method).click()
    }
}