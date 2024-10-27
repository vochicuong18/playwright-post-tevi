// @ts-check
import {defineConfig, devices} from '@playwright/test';
import fs from 'fs';
import os from 'node:os';
import dotenv from 'dotenv';
import path from 'path';
import {parse} from 'csv-parse/sync';

dotenv.config({path: path.resolve(__dirname, '.env')});

/**
 * data test example path : D:\tevi\27102024\data-test.json
 */

const localDataPath = process.env.LOCAL_DATA_PATH;
const folder = process.env.FOLDER_NAME || 'defaultFolder';

console.log("-------localDataPath: ", localDataPath)
console.log("-------folder: ", folder)
const filePath = path.join(localDataPath, folder, 'data.json');

const records = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const projects = records.map(record => ({
    name: record.profileName,
    use: {
        profilePath: record.profilePath,
        profileName: record.profileName,
        audience: record.audience,
        star: record.star,
        allowReplying: record.allowReplying,
        canComment: record.canComment,
        allowRepWithLink: record.allowRepWithLink,
        pinPost: record.pinPost,
        collection: record.collection,
        filePath: record.filePath,
        statusPost: record.statusPost,
    },
}));

module.exports = defineConfig({
    fullyParallel: false,
    timeout: 0,
    testDir: './tevi/sanity',
    workers: 1,
    reporter: 'html',
    use: {
        actionTimeout: 30000,
        baseURL: process.env.URL,
        headless: false,
        video: 'retain-on-failure',
        screenshot: {mode: 'only-on-failure', fullPage: true},
    },
    projects,
});
