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
        this.btnLogin = page.locator('.panel.header li.authorization-link>a');
        this.cartIcon = page.locator('a.action.showcart')
        this.lnkViewCart = page.locator('a.action.viewcart')
        this.txtSearch = page.locator('input#search')
        this.btnAcceptCookie = page.locator('button#btn-cookie-allow')
        this.cartCountEmpty = page.locator("//div[@class='minicart-wrapper']//span[contains(@class, 'counter qty empty')]")
        this.emptyCartTitle = page.locator('.subtitle.empty')
        this.loadingMask = page.locator('div.cart-totals div.loader')
        this.body = page.locator('body#html-body')
        this.lblWelcomeNotLogged = page.locator('div.panel.header span.not-logged-in')
        this.expandAccountMenu = page.locator('div.header button[data-action="customer-menu-toggle"]')
        this.lnkSignOut = page.getByRole("link", {name: "Sign Out"})
    }

    async getTitle() {
        return await this.page.title()
    }

    async getURL() {
        return this.page.url();

    }

    async switchLanguage(language) {
        await test.step(`Switch to ${language}`, async () => {
            await this.btnAcceptCookie.click()
            if (language === 'English') {
                await this.lbLanguageZH.click();
                await this.btnSwitchLanguage.click();
            } else {
                await this.lbLanguageEN.click();
                await this.btnSwitchLanguage.click();
            }
            await waitUtility.sleep(2);
        })

    }

    async navigateToLogin() {
        await test.step(`Navigate to login page`, async () => {
            await this.btnLogin.click()
            await this.page.waitForURL('**/login/**');
            await this.page.waitForLoadState('domcontentloaded')
        })
        return new LoginPage(this.page)
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

        return new ShoppingCartPage(this.page)
    }

    async searchProduct(product) {
        await test.step(`Search ${product.getName()}`, async () => {
            await this.txtSearch.fill(product.getName())
            await this.page.keyboard.press('Enter')
        })
        return new ProductListPage(this.page)
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
