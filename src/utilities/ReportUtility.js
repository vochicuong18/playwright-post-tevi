import {ContentType, Status} from "allure-js-commons";

const allure = require("allure-js-commons");

export default class ReportUtility {
    constructor(page) {
        this.page = page
    }


    async attachScreenshot(description) {
        await allure.attachment(description, await this.page.screenshot(), {contentType: "image/png"})
    }

    async attachImage(description, path) {
        await allure.attachmentPath(description, path, {
            contentType: ContentType.PNG,
            fileExtension: "png"
        })
    }

    async logPassed(description) {
        await allure.logStep(description, Status.PASSED)
    }

    async logFailure(description) {
        await allure.logStep(description, Status.FAILED)
    }

    async logInfo(description) {
    }
}
