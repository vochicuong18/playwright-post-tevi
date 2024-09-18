import ProductDetailsPage from "./ProductDetailsPage"

export default class {
    constructor(page) {
        this.page = page
        this.productItem = (url) => {
            return page.locator(`//ol[@class='products list items product-items']//a[contains(@href, '${url}')]//parent::div[@class='product-item-info']`)
        }
        this.btnAddToCart = (url) => {
            return page.locator(`//a[contains(@href, '${url}')]//ancestor::li[@class='item product product-item']//button`)
        }
    }

    async goToProductDetails(product){
        await this.productItem(product.getURL()).hover()
        await this.productItem(product.getURL()).click()
        return new ProductDetailsPage(this.page)
    }
}