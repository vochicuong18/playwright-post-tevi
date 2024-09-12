export default class OrderDetailsPage {
    constructor(page) {
        this.page = page
        this.orderNumber = page.locator("span[data-ui-id='page-title-wrapper']")
        this.subTotal = page.locator('tr.subtotal span.price')
        this.shippingFee = page.locator('tr.shipping span.price')
        this.grandTotal = page.locator('tr.grand_total span.price')
        this.shippingAddress = page.locator('div.box-order-shipping-address address')
        this.billingAddress = page.locator('div.box-order-billing-address address')
        this.paymentMethod = page.locator('div.box-order-billing-method div.box-content')
    }

    async checkOrderStatus(orderStatus){

    }

    async checkProduct(product) {

    }

    async checkSubtotal(subtotal) {

    }

    async checkShippingFee(shippingFee) {

    }

    async checkGrandTotal(grandTotal) {

    }

    async checkShippingAddress(customer) {

    }

    async checkBillingAddress(customer) {

    }

    async checkPaymentMethod(paymentMethod){

    }
}