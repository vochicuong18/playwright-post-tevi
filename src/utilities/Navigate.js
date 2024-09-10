const fs = require('fs');
const rawData = fs.readFileSync('src/data/environment.json');
const data = JSON.parse(rawData);

export default class Navigate {
    static navigateToHomePage(page){
        page.goto(data[data.env]['fo'])    
        page.waitForLoadState()
    }
}