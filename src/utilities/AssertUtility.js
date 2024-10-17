import {expect, test} from '@playwright/test'

export default class AssertUtility {
    constructor(page) {
        this.page = page
    }

    static async assertEquals(actual, expected, description) {
        await test.step(`${description} [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual).toEqual(expected)
        })
    }

    static async asserNotEquals(actual, expected, description) {
        await test.step(`${description} [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual).not.toEqual(expected)
        })
    }

    static async assertTrue(condition, description) {
        await test.step(`Verify ${description} is true`, async () => {
            expect.soft(condition).toBeTruthy()
        })
    }

    static async assertFalse(condition, description) {
        await test.step(`Verify ${description} is false`, async () => {
            expect.soft(condition).toBeTruthy()
        })
    }

    static async assertContains(actual, expected, description) {
        await test.step(`${description} [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual).toContain(expected)
        })
    }

    static async assertNotContains(actual, expected, description) {
        await test.step(`${description} [actual: ${actual} - expected: ${expected}]`, async () => {
            expect.soft(actual).not.toContain(expected)
        })
    }
}
