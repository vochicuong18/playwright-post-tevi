import CheckoutPage from "./CheckoutPage";
import WaitUtility from "../../utilities/WaitUtility";

let waitUtility

export default class ShippingPage {
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.btnNext = page.locator("button[data-role='opc-continue']")
    }

    async gotoCheckOutPage() {
        await this.btnNext.click()
        await waitUtility.waitForURLEndWith("/checkout/#payment")
        return new CheckoutPage(this.page)
    }
}