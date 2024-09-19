import {expect} from "@playwright/test";
import ShippingPage from "./ShippingPage";
import product from "../../entities/product/Product";
import StringUtility from "../../utilities/StringUtility";
import PriceUtility from "../../utilities/PriceUtility";

export default class ShoppingCartPage {
    constructor(page) {
        this.page = page
        this.btnDeleteItem = page.locator('a.action.action-delete')
        this.subTotal = page.locator('tr.totals.sub span.price')
        this.shippingFee = page.locator('tr.totals.shipping.excl span.price')
        this.grandTotal = page.locator('tr.grand.totals span.price')
        this.productItem = (productName) => {
            return page.locator(`//table[@id='shopping-cart-table']//a[text()='${productName}']`)
        }
        this.productSubtotal = (productName) => {
            return page.locator(`//a[text()='${productName}']//ancestor::tr//td[@class='col subtotal']//span[@class='price']`)
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
        let gui = await this.productSubtotal(product.getName()).textContent()
        let data = await PriceUtility.convertPriceToString(product.getQty() * product.getPrice())
        await expect.soft(this.productItem(product.getName())).toBeVisible();
        await expect.soft(gui, `Check product grand total gui: ${gui} - data: ${data} `).toEqual(data)
    }

    async checkSubTotal(subTotal) {
        let data = await PriceUtility.convertPriceToString(subTotal)
        let gui = await this.subTotal.textContent()
        await expect.soft(gui, "Check sub total").toEqual(data)
    }

    async checkGrandTotal(grandTotal) {
        let data = await PriceUtility.convertPriceToString(grandTotal)
        let gui = await this.grandTotal.textContent()
        await expect.soft(gui, "check grand total").toEqual(data)
    }

    async empty() {
        while (await this.btnDeleteItem.count() > 0) {
            await this.btnDeleteItem.first().click()
            await this.page.waitForLoadState()
        }
    }
}