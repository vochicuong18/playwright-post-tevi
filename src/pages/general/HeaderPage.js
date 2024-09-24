import WaitUtility from "../../utilities/WaitUtility";
import LoginPage from "./LoginPage"
import ShoppingCartPage from "./ShoppingCartPage.js"
import ProductListPage from "../product/ProductListPage";

let waitUtility

export default class HeaderPage {
    constructor(page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.lbLanguageEN = page.locator('css=#switcher-language-trigger strong.view-en_hk');
        this.lbLanguageZH = page.locator('css=#switcher-language-trigger strong.view-zh_hk');
        this.btnSwitchLanguage = page.locator('css=#switcher-language li.switcher-option>a');
        this.btnLogin = page.locator('.panel.header li.authorization-link>a');
        this.cartIcon = page.locator('a.action.showcart')
        this.lnkViewCart = page.locator('a.action.viewcart')
        this.txtSearch = page.locator('input#search')
        this.btnAcceptCookie = page.locator('button#btn-cookie-allow')
        this.cartCount = page.locator("//div[@class='minicart-wrapper']//span[contains(@class, 'counter qty')]")
        this.emptyCartTitle = page.locator('.subtitle.empty')
        this.loadingMask = page.locator('div.cart-totals div.loader')
    }

    async getTitle() {
        return await this.page.title()
    }

    async getURL() {
        return await this.page.url()

    }

    async switchLanguage(language) {
        await this.btnAcceptCookie.click()
        if (language == 'English') {
            await this.lbLanguageZH.click();
            await this.btnSwitchLanguage.click();
        } else {
            await this.lbLanguageEN.click();
            await this.btnSwitchLanguage.click();
        }
        await waitUtility.sleep(2);
    }

    async navigateToLogin() {
        await this.btnLogin.click()
        await this.page.waitForURL('**/login/**');
        await this.page.waitForLoadState()
        return new LoginPage(this.page)
    }

    async viewMiniCart() {
        await this.page.waitForLoadState()
        await waitUtility.sleep(2) // temp handle mini cart loading
        await this.cartIcon.click()
    }

    async viewShoppingCart() {
        await this.lnkViewCart.click()
        await this.page.waitForURL('**/checkout/cart/');
        await this.page.waitForLoadState()
        await waitUtility.waitForPresentOf(this.loadingMask)
        await waitUtility.waitForNotPresentOf(this.loadingMask)
        return new ShoppingCartPage(this.page)
    }

    async searchProduct(product) {
        await this.txtSearch.fill(product.getName())
        await this.page.keyboard.press('Enter')
        return new ProductListPage(this.page)
    }

    async isEmptyCartTitleDisplayed() {
        return await this.emptyCartTitle.isVisible()
    }

}