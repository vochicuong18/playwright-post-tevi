import WaitUtility from "../../utilities/WaitUtility";
import LoginPage from "./LoginPage"
import ShoppingCartPage from "./ShoppingCartPage.js"
import ProductListPage from "../product/ProductListPage";
import {test} from "@playwright/test";


let waitUtility

export default class HeaderPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.lbLanguageEN = page.locator('#switcher-language-trigger strong.view-en_hk');
        this.lbLanguageZH = page.locator('#switcher-language-trigger strong.view-zh_hk');
        this.btnSwitchLanguage = page.locator('#switcher-language li.switcher-option>a');
        this.lblLanguage = page.locator('#switcher-language-trigger strong');
        this.btnLogin = page.locator('.panel.header li.authorization-link>a');
        this.cartIcon = page.locator('a.action.showcart')
        this.lnkViewCart = page.locator('a.action.viewcart')
        this.txtSearch = page.locator('input#search')
        this.btnAcceptCookie = page.locator('button#btn-cookie-allow')
        this.emptyCartTitle = page.locator('.subtitle.empty')
        this.loadingMask = page.locator('div.cart-totals div.loader')
        this.body = page.locator('body#html-body')
        this.lblWelcomeNotLogged = page.locator('div.panel.header span.not-logged-in')
        this.expandAccountMenu = page.locator('div.header button[data-action="customer-menu-toggle"]')
        this.lnkSignOut = page.locator("//div[@aria-hidden='false']//li[@data-label='or']//a")
    }

    async getTitle() {
        return await this.page.title()
    }

    async getURL() {
        return this.page.url();

    }

    async acceptCookie() {
        await test.step(`Accept cookie`, async () => {
            await this.btnAcceptCookie.click()
        })
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
            await this.page.waitForURL('**/login/**');
            await this.page.waitForLoadState('domcontentloaded')
        })
    }

    async viewMiniCart() {
        await test.step(`View mini cart`, async () => {
            await this.page.waitForLoadState()
            await waitUtility.waitForValueOfAttributeContains(this.body, "aria-busy", "false")
            await this.cartIcon.highlight()
            await this.cartIcon.click()
        })
    }

    async viewShoppingCart() {
        await test.step(`View shopping cart page`, async () => {
            await this.lnkViewCart.click()
            await this.page.waitForURL('**/checkout/cart/');
            await this.page.waitForLoadState()
            await waitUtility.waitForPresentOf(this.loadingMask)
            await waitUtility.waitForNotPresentOf(this.loadingMask)
        })
    }

    async searchProduct(product) {
        await test.step(`Search ${product.getName()}`, async () => {
            await this.txtSearch.fill(product.getName())
            await this.page.keyboard.press('Enter')
        })
    }

    async isCartEmpty() {
        return await this.emptyCartTitle.isVisible()
    }

    async signOut() {
        await test.step(`Logout`, async () => {
            await waitUtility.waitForNotPresentOf(this.lblWelcomeNotLogged)
            await this.expandAccountMenu.click()
            await this.lnkSignOut.click()
            await this.page.waitForLoadState()
            await waitUtility.waitForURLContains("/account/logoutSuccess/")
            let currentUrl = this.page.url()
            await waitUtility.waitForURLChange(currentUrl)
        })
    }

}
