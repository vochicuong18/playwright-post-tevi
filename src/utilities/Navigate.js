const fs = require('fs');
const rawData = fs.readFileSync('src/data/environment.json');
const data = JSON.parse(rawData);

export default class Navigate {
    static async navigateToHomePage(page) {
        await page.goto(data[data.env]['fo'])
        await page.waitForLoadState()
    }
}