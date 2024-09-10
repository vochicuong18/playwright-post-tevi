import { test as fixture } from '@playwright/test'
import HomePage from '../pages/general/HomePage' 
import LoginPage from '../pages/general/LoginPage'

const test = fixture.extend({    
    loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
    homePage : async ({ page }, use) => {
        await use(new HomePage(page))
    }
})


export default test