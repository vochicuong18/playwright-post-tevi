import {expect, test} from "@playwright/test";
import ShippingPage from "./ShippingPage";
import PriceUtility from "../../utilities/PriceUtility";
import WaitUtility from "../../utilities/WaitUtility";
import AssertUtility from "../../utilities/AssertUtility";

let waitUtility
export default class ShoppingCartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
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
        this.btnCheckout = page.locator("button[data-role='proceed-to-checkout']")
    }

    async goToShippingPage() {
        await test.step(`Go to shipping page`, async () => {
            await waitUtility.waitForNotPresentOf(this.loadingMask)
            await this.btnCheckout.click()
            await this.page.waitForLoadState("domcontentloaded")
        })
    }

    async checkProduct(product) {
        await test.step(`Check product ${product.getName()}`, async () => {
            let gui = await this.productSubtotal(product.getName()).textContent()
            let data = await PriceUtility.convertPriceToString(product.getQty() * product.getPrice())
            await AssertUtility.assertTrue(await this.productItem(product.getName()).isVisible(), `Check ${product.getName()} displayed`)
            await AssertUtility.assertEquals(gui, data, "Check product grand total")
        })
    }

    async checkSubTotal(subTotal) {
        let data = await PriceUtility.convertPriceToString(subTotal)
        let gui = await this.subTotal.textContent()
        await AssertUtility.assertEquals(gui, data, "Check subtotal")
    }

    async checkGrandTotal(grandTotal) {
        let data = await PriceUtility.convertPriceToString(grandTotal)
        let gui = await this.grandTotal.textContent()
        await AssertUtility.assertEquals(gui, data, "Check grand total")
    }

    async empty() {
        await test.step(`Clear all item in the shopping cart`, async () => {
            while (await this.btnDeleteItem.count() > 0) {
                await this.btnDeleteItem.first().click()
                await this.page.waitForLoadState()
            }
        })

    }
}
