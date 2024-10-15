import {ContentType, Status} from "allure-js-commons";
import {test} from "@playwright/test";

const allure = require("allure-js-commons");

/**
 * https://allurereport.org/docs/test-statuses/
 * */

export default class ReportUtility {

    static async logInfo(description) {
        await allure.step(`Log info: ${description}`, async () => {
            // await allure.attachment(description, "", ContentType.TEXT)
            // // await allure.attachment("Log info", description, ContentType.TEXT)
        })

    }

    static async logPassed(description) {
        await allure.logStep(description, Status.PASSED)
    }

    static async logFailed(description) {
        await allure.logStep(description, Status.FAILED)
    }

    static async logBroken(description) {
        await allure.logStep(description, Status.BROKEN)
    }

    static async logSkipped(description) {
        await allure.logStep(description, Status.SKIPPED)
    }

    static async attachScreenshot(page, description) {
        await test.step("Attach screenshot", async () => {
            await allure.attachment(
                description,
                await page.screenshot({fullPage: true}),
                {contentType: "image/png"})
        })

    }

    static async attachImage(description, path) {
        await test.step('Attach image', async () => {
            await allure.attachmentPath(description, path, {contentType: ContentType.PNG})
        })
    }

    static async attachFile(description, contentType, path) {
        await allure.attachmentPath(description, path, contentType)
    }
}
