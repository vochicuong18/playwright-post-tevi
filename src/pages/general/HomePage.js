import WaitUtility from "../../utilities/WaitUtility";
import {test} from "@playwright/test";

let waitUtility

export default class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.avatar = page.locator('div.btn-default.false');
    }

    async getTitle() {
        return await this.page.title()
    }

    async getURL() {
        return await this.page.url()

    }

    async goToMyAccountPage(){
        await this.avatar.click()
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
    }
}
