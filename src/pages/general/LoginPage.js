import WaitUtility from "../../utilities/WaitUtility";
import MyAccount from "../customer/MyAccount";

let waitUtility

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor (page) {
        this.page = page;
        waitUtility = new WaitUtility(this.page);
        this.chkLoginViaPassword = page.locator("input[value='loginwithpassword']")
        this.txtEmail = page.locator('#mobile-login-email')
        this.txtPassword = page.locator('#mobile-login-pass')
        this.btnLogin = page.getByTitle('Login')
        this.lblWelcomeNotLogged = page.locator('div.panel.header span.not-logged-in')
    }

    async loginViaPassword(customer){
        await this.chkLoginViaPassword.check()
        await this.txtEmail.clear()
        await this.txtEmail.fill(customer.getEmail())
        await this.txtPassword.fill(customer.getPassword())
        await this.btnLogin.click()
        await waitUtility.waitForURLEndWith("/customer/account/")
        await this.page.waitForLoadState()
        await waitUtility.waitForNotPresentOf(this.lblWelcomeNotLogged)
        return new MyAccount(this.page)
    }
}

export default LoginPage