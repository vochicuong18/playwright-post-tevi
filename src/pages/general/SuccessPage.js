import OrderDetailsPage from "./OrderDetailsPage";

export default class SuccessPage {
    constructor(page) {
        this.page = page
        this.orderNumber = page.locator('a.order-number')
    }

    async goToOrderDetailPage () {
        await this.orderNumber.click()
        await this.page.waitForURL("**/order/view/order_id/**")
        await this.page.waitForLoadState()
        return new OrderDetailsPage(this.page)
    }

}