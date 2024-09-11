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

    async waitForValueOfAttributeDoesNotContains(element, attribute, expectedValue) {
        await this.page.waitForFunction(() => {
                return element && !element.classList.contains(expectedValue)
            }, {timeout: 5000}
        )

    }
}

export default WaitUtility