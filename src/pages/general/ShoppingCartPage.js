import ShippingPage from "./ShippingPage";

export default class ShoppingCartPage {
    constructor(page) {
        this.page = page
        this.loadingMask = page.locator('div.cart-totals div.loader')
        this.btnCheckout = page.getByRole('button', {name: 'Proceed to Checkout'})
    }

    async goToShippingPage() {
        await this.loadingMask.waitFor({state: 'attached'})
        await this.loadingMask.waitFor({state: 'detached'})
        await this.btnCheckout.click()
        return new ShippingPage(this.page)
    }
}