import {expect} from "@playwright/test";

let MAX_COUNT = 30

class WaitUtility {


    constructor(page) {
        this.page = page
    }

    async sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }

    async waitForURLEndWith(endURL) {
        for (let i = 0; i < MAX_COUNT; i++) {
            if (this.page.url().endsWith(endURL))
                break
            else
                await this.sleep(1)
        }
    }

    async waitForURLContains(url) {
        for (let i = 0; i < MAX_COUNT; i++) {
            if (this.page.url().includes(url))
                break
            else
                await this.sleep(1)
        }
    }

    async waitForValueOfAttributeDoesNotContains(element, attributeName, expectedValue) {
        await this.page.waitForFunction((data) => {
            return !document.querySelector(data.selector).getAttribute(data.attribute).includes(data.expected);
        }, {selector: element._selector, attribute: attributeName, expected: expectedValue});
    }

    async waitForValueOfAttributeContains(element, attributeName, expectedValue) {
        await this.page.waitForFunction((data) => {
            return document.querySelector(data.selector).getAttribute(data.attribute).includes(data.expected);
        }, {selector: element._selector, attribute: attributeName, expected: expectedValue});
    }

    async waitForPresentOf(element) {
        return await element.waitFor({state: 'attached'})
    }

    async waitForNotPresentOf(element) {
        return await element.waitFor({state: 'detached'})
    }

    async waitUntilVisibilityOf(element) {
        return await element.waitFor({state: 'visible'})
    }

    async waitForInvisibilityOf(element) {
        return await element.waitFor({state: 'hidden'})
    }
}

export default WaitUtility