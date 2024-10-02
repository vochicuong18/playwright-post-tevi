import WaitUtility from "../../utilities/WaitUtility";
import LoginPage from "./LoginPage"

let waitUtility

export default class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor (page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.lbLanguageEN = page.locator('css=#switcher-language-trigger strong.view-en_hk');
        this.lbLanguageZH = page.locator('css=#switcher-language-trigger strong.view-zh_hk');
        this.btnSwitchLanguage = page.locator('css=#switcher-language li.switcher-option>a');
        this.btnLogin = page.locator('.panel.header li.authorization-link>a');
    }

    async getTitle(){
        return await this.page.title()
    }

    async getURL(){
        return await this.page.url()

    }

    async switchLanguage(language) {
        await waitUtility.sleep(5);
        if (language == 'English') {
            await this.lbLanguageZH.click();
            await this.btnSwitchLanguage.click();
         } else {
            await this.lbLanguageEN.click();
            await this.btnSwitchLanguage.click();
        }
       await waitUtility.sleep(2);
    }

    async navigateToLogin(){
        await this.btnLogin.click()
        await this.page.waitForURL('**/login/**');
        await this.page.waitForLoadState()
        return new LoginPage(this.page)
    }
}