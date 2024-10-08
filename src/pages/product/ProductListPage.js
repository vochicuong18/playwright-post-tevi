import ProductDetailsPage from "./ProductDetailsPage"
import {test} from "@playwright/test";

export default class ProductListPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.productItem = (url) => {
            return page.locator(`//ol[@class='products list items product-items']//a[contains(@href, '${url}')]//parent::div[@class='product-item-info']`)
        }
    }

    async goToProductDetails(product) {
        await test.step(`Go to ${product.getName()}  details page`, async () => {
            await this.productItem(product.getURL()).hover()
            await this.productItem(product.getURL()).click()
        })
        return new ProductDetailsPage(this.page)
    }
}