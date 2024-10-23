import WaitUtility from "../../utilities/WaitUtility";
import MyAccount from "../customer/MyAccount";
import {test} from "@playwright/test";

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
        this.btnLogin = page.locator("#login-email-default button" )
        this.lblWelcomeNotLogged = page.locator('div.panel.header span.not-logged-in')
    }

    async loginViaPassword(customer){
        await test.step(`Login with customer ${customer.getEmail()}`, async () => {
            await waitUtility.sleep(1)
            await this.chkLoginViaPassword.check()
            await this.txtEmail.clear()
            await this.txtEmail.fill(customer.getEmail())
            await this.txtPassword.fill(customer.getPassword())
            await this.btnLogin.click()
            await waitUtility.waitForURLEndWith("/customer/account/")
            await this.page.waitForLoadState()
            await waitUtility.waitForNotPresentOf(this.lblWelcomeNotLogged)
        })
    }
}

export default LoginPage
