import {expect} from "@playwright/test";
import WaitUtility from "../../utilities/WaitUtility";
import StringUtility from "../../utilities/StringUtility";

let waitUtility

export default class MyAccount {
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.lbContactInfo = page.locator('div.box-information div.box-content>p')
        this.email = page.locator(`div.box-information div.box-content`)
    }

    async checkContactInfo(customer) {
        let data = await customer.getFirstName() + " " + customer.getLastName() + " " + customer.getEmail()
        let gui = await StringUtility.getText(this.lbContactInfo)
        await expect.soft(this.email, 'Check customer email logged in successfully').toContainText(customer.getEmail())
        await expect.soft(gui).toEqual(data)
    }
}