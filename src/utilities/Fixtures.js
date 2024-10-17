import {mergeTests} from "@playwright/test";
import {test as baseTest} from './BaseTest'
import {test as dataTest} from './DataTest'

export const test = mergeTests(baseTest, dataTest)