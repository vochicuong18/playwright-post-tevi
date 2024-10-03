import {expect, test} from '@playwright/test'

export default class AssertUtility {
    constructor(page) {
        this.page = page
    }

    async static assertEquals(actual, expected, description) {
        expect.soft(actual, description).toEqual(expected)
    }

    static asserNotEquals(actual, expected, description) {
        expect.soft(actual, description).not.toEqual(expected)
    }

    static assertTrue(condition, description) {
        expect.soft(condition, description).toBeTruthy()
    }

    static assertFalse(condition, description) {
        expect.soft(condition, description).not.toBeTruthy()
    }
}