import {test as baseTest} from '@playwright/test';
import HomePage from '../pages/general/HomePage';
import MyAccount from '../pages/general/MyAccount';
import NavigateUtility from './NavigateUtility';
import {chromium} from 'playwright';

let page
export const test = baseTest.extend({
    profilePath: ['path/to/profile', {option: true}],
    profileName: ['Default Profile', {option: true}],
    browserContext: async ({profilePath, profileName}, use) => {
        const context = await chromium.launchPersistentContext(profilePath, {
            headless: false,
            channel: 'chrome',
            deviceScaleFactor: undefined,
            viewport: null,
            args: [`--start-maximized`, `--profile-directory=${profileName}`],
            slowMo: 1000,
        });
        page = context.pages()[0] || await context.newPage();
        await use(page);
    },

    homePage: async ({}, use) => {
        await NavigateUtility.navigateToHomePage(page);
        await use(new HomePage(page));
    },

    myAccount: async ({}, use) => {
        await use(new MyAccount(page));
    },
});

