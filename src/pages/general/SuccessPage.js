import OrderDetailsPage from "./OrderDetailsPage";
import {test} from "@playwright/test";

export default class SuccessPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.orderNumber = page.locator('a.order-number')
    }

    async goToOrderDetailPage() {
        await test.step(`Go to order details page`, async () => {
            await this.orderNumber.click()
            await this.page.waitForURL("**/order/view/order_id/**")
            await this.page.waitForLoadState()
        })
        return new OrderDetailsPage(this.page)
    }

}