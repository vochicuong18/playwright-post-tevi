export default class CheckoutPage {
    constructor(page) {
        this.page = page
        this.cbPaymentMethod = (paymentMethod) => {
            return page.locator(`//input[@id='${paymentMethod}']`)
        }
        this.cbCheckoutAgreement = page.locator('div.payment-method._active div.checkout-agreements')
        this.btnCheckout = page.getByRole('button', {name: 'Place Order'})

    }

    async selectPaymentMethod(paymentMethod) {
        await this.cbPaymentMethod(paymentMethod).click()
    }

    async agreeTerm() {
        await this.cbCheckoutAgreement.click()
    }

    async placeOrder() {
        await this.btnCheckout.click()
    }
}