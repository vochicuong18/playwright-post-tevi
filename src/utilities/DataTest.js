import {test as baseTest} from '@playwright/test';

export const test = baseTest.extend({
    profilePath: ['', {option: true}],
    profileName: ['', {option: true}],
    audience: ['MEMBERS', {option: true}],
    star: ['5', {option: true}],
    allowReplying: ['true', {option: true}],
    canComment: ['FOLLOWERS', {option: true}],
    allowRepWithLink: ['true', {option: true}],
    pinPost: ['true', {option: true}],
    collection: ['Check1', {option: true}],
    filePath: ['test.png', {option: true}],
    statusPost: ['test', {option: true}],
})
