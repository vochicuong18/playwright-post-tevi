import {expect, test} from '@playwright/test'

export default class AssertUtility {
    constructor(page) {
        this.page = page
    }

    static async assertEquals(actual, expected, description) {
            await test.step(`Verify equals [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual, description).toEqual(expected)
        })
    }

    static async asserNotEquals(actual, expected, description) {
        await test.step(`Verify not equals [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual, description).not.toEqual(expected)
        })
    }

    static async assertTrue(condition, description) {
        await test.step(`Verify ${description} is true`, async () => {
            expect.soft(condition, description).toBeTruthy()
        })
    }

    static async assertFalse(condition, description) {
        await test.step(`Verify ${description} is false`, async () => {
            expect.soft(condition, description).toBeTruthy()
        })
    }

    static async assertContains(actual, expected, description) {
        await test.step(`Verify contains [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual, description).toContain(expected)
        })
    }

    static async assertNotContains(actual, expected, description) {
        await test.step(`Verify not contains [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual, description).not.toContain(expected)
        })
    }
}
