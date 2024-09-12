import {expect} from "@playwright/test";
import ShippingPage from "./ShippingPage";
import product from "../../entities/Product";
import StringUtility from "../../utilities/StringUtility";

export default class ShoppingCartPage {
    constructor(page) {
        this.page = page
        this.btnDeleteItem = page.locator('a.action.action-delete')
        this.subTotal = page.locator('tr.totals.sub span.price')
        this.shippingFee = page.locator('tr.totals.shipping.excl span.price')
        this.grandTotal = page.locator('tr.grand.totals span.price')
        this.productItem = (productName) => {
            return page.locator(`//tr[@class='item-info' and //a[text()='${productName}']]`)
        }
        this.productGrandTotal = (productName) => {
            return page.locator(`//tr[@class='item-info' and //a[text()='${productName}']]//td[@class='col subtotal']//span[@class='price']`)
        }
        this.loadingMask = page.locator('div.cart-totals div.loader')
        this.btnCheckout = page.getByRole('button', {name: 'Proceed to Checkout'})
    }

    async goToShippingPage() {
        await this.loadingMask.waitFor({state: 'detached'})
        await this.btnCheckout.click()
        return new ShippingPage(this.page)
    }

    async checkProduct(product) {
        await this.loadingMask.waitFor({state: 'attached'})
        await this.loadingMask.waitFor({state: 'detached'})
        await expect.soft(this.productItem(product.getName())).toBeVisible();
        let gui = await this.productGrandTotal(product.getName()).textContent()
        let data = await StringUtility.convertPriceToString(product.getQty() * product.getPrice())
        await expect.soft(gui, "Check product grand total").toEqual(data)
    }

    async checkSubTotal(subTotal) {
        let data = await StringUtility.convertPriceToString(subTotal)
        let gui = await this.subTotal.textContent()
        await expect.soft(gui, "Check sub total").toEqual(data)
    }

    async checkGrandTotal(grandTotal) {
        let data = await StringUtility.convertPriceToString(grandTotal)
        let gui = await this.grandTotal.textContent()
        await expect.soft(gui, "check grand total").toEqual(data)
    }
}