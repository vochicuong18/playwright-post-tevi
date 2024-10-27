import {test} from "@playwright/test";

const fs = require('fs');
const rawData = fs.readFileSync('src/data/environment.json', 'utf8');
const data = JSON.parse(rawData);

export default class NavigateUtility {
    static async navigateToHomePage(page) {
        await test.step(`Navigate home page`, async () => {
            await page.goto(data[data.env]['fo'])
            await page.waitForLoadState('domcontentloaded')
            await page.waitForLoadState('networkidle')
            await page.waitForURL('**/home');
        })
    }
}