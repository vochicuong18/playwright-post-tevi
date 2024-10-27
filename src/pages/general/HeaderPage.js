import WaitUtility from "../../utilities/WaitUtility";
import {test} from "@playwright/test";


let waitUtility

export default class HeaderPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.btnLogin = page.locator('button.btn-login');
    }

    async getTitle() {
        return await this.page.title()
    }

    async getURL() {
        return this.page.url();

    }


    async switchLanguage(language) {
        await test.step(`Switch to ${language}`, async () => {
            const languages = {
                en: 'English',
                zh: 'Traditional Chinese'
            };
            const expectLanguage = languages[language];
            let currentLanguage = (await this.lblLanguage.textContent()).trim()

            if (currentLanguage !== expectLanguage) {
                let btnLanguage = (language === "en") ? this.lbLanguageZH : this.lbLanguageEN
                await btnLanguage.click()
                await this.btnSwitchLanguage.click()
            }
        })
    }

    async navigateToLogin() {
        await test.step(`Navigate to login page`, async () => {
            await this.btnLogin.click()
            await this.page.waitForLoadState('domcontentloaded')
        })
    }

    async signOut() {
        await test.step(`Logout`, async () => {
            await this.page.waitForLoadState()
            await waitUtility.waitForURLContains("/account/logoutSuccess/")
            let currentUrl = this.page.url()
            await waitUtility.waitForURLChange(currentUrl)
        })
    }

}
