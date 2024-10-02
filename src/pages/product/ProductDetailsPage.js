import WaitUtility from "../../utilities/WaitUtility";
import Product from "../../entities/product/Product";
import BundleItem from "../../entities/product/BundleItem";

let waitUtility

export default class ProductDetailsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page);
        this.productQty = page.locator('input#qty')
        this.btnAddToCart = page.locator('button#product-addtocart-button')
        this.btnCustomize = page.getByRole('button', {name: 'Customize and Add to Cart'})
        this.cartCountLoading = page.locator('span.counter.qty')
        this.successMessage = page.locator('div.message-success.success.message')
        this.cbBundleItem = (bundleItemName) => {
            return page.locator(`//span[@class='product-name' and text()='${bundleItemName}']`)
        }
        this.txtBundleItemQty = (bundleItemName) => {
            return page.locator(`//span[@class='product-name' and text()='${bundleItemName}']//ancestor::div[contains(@class, 'options-list')]//input[contains(@class, 'input-text qty')]`)
        }
    }

    async addToCart(product) {
        if (product.getType() === Product.ProductType.BUNDLE) {
            await this.customizeBundleProduct(product)
        }
        await this.productQty.fill(product.getQty().toString())
        await this.btnAddToCart.click()
        await waitUtility.waitForValueOfAttributeDoesNotContains(this.cartCountLoading, "class", "_block-content-loading")
        await waitUtility.waitForPresentOf(this.successMessage)
    }

    async customizeBundleProduct(product) {
        await this.btnCustomize.click();
        for (const item of product.getListProducts()) {
            if (item.getBundleItemType() === BundleItem.Type.CHECKBOX) {
                await this.cbBundleItem(item.getName()).click();
            }
            await this.txtBundleItemQty(item.getName()).fill(item.getQty().toString());
        }
    }
}