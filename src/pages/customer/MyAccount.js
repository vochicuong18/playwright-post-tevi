import {expect} from "@playwright/test";
import WaitUtility from "../../utilities/WaitUtility";
import StringUtility from "../../utilities/StringUtility";
import ProductListPage from "../product/ProductListPage"

let waitUtility

export default class MyAccount {
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.lbContactInfo = page.locator('div.box-information div.box-content>p')
        this.email = page.locator(`div.box-information div.box-content`)
        this.category = (categoryName) => {
            return page.locator(`//span[text()='${categoryName}']//ancestor::li`)
        }
        this.txtSearch = page.locator('input#search')
    }

    async checkContactInfo(customer) {
        let data = await customer.getFirstName() + " " + customer.getLastName() + " " + customer.getEmail()
        let gui = await StringUtility.getText(this.lbContactInfo)
        await expect.soft(this.email, 'Check customer email logged in successfully').toContainText(customer.getEmail())
        await expect.soft(gui).toEqual(data)
    }

    async searchProduct(product) {
        await this.txtSearch.fill(product.getName())
        await this.page.keyboard.press('Enter')
        return new ProductListPage(this.page)
    }
}