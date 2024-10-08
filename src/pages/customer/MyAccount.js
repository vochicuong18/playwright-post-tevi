import {expect, test} from "@playwright/test";
import WaitUtility from "../../utilities/WaitUtility";
import StringUtility from "../../utilities/StringUtility";
import AssertUtility from "../../utilities/AssertUtility";

let waitUtility

export default class MyAccount {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.lbContactInfo = page.locator('div.box-information div.box-content>p')
        this.email = page.locator(`div.box-information div.box-content`)
        this.category = (categoryName) => {
            return page.locator(`//span[text()='${categoryName}']//ancestor::li`)
        }
    }

    async checkContactInfo(customer) {
        await test.step(`Check contact info`, async () => {
            let data = await customer.getFirstName() + " " + customer.getLastName() + " " + customer.getEmail()
            let gui = await StringUtility.getText(this.lbContactInfo)
            await AssertUtility.assertContains(await this.email.textContent(), customer.getEmail(), "Check customer email logged in successfully")
            await AssertUtility.assertEquals(gui, data, "Check contact information")
        })

    }
}
