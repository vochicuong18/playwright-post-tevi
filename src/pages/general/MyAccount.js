import WaitUtility from "../../utilities/WaitUtility";
import path from "path";
import fs from 'fs';

let waitUtility

export default class MyAccount {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page)
        this.btnCreate = page.getByRole("button", {name: "Create"})
        this.btnCreateNewPost = page.locator("//span[text()='Create a post']")
        this.everyone = page.locator("//div[text()='Free for everyone']//parent::div//parent::div//input")
        this.member = page.locator("//div[text()='Exclusive content']//parent::div//parent::div//input")
        this.starNumber = page.locator("input[role='spinbutton']")
        this.audience = page.locator("//div[text()='Exclusive content' or text()='Everyone']")
        this.setting = page.locator("//span[text()='Settings']")
        this.collections = page.locator("//span[text()='Collections']")
        this.allowReplyingToggle = page.locator("//div[text()='Allow replying']//parent::div//button[@role='switch']")
        this.allowRepWithLink = page.locator("//div[text()='Allow reply with links']//parent::div//button[@role='switch']")
        this.pinPostToggle = page.locator("//div[text()='Pin this post']//parent::div//button[@role='switch']")
        this.followerComment = page.locator("input[value='FOLLOWERS']")
        this.paidViewerComment = page.locator("input[value='PAID_USERS']")
        this.btnAttach = page.locator("label[for='imageVideo']")
        this.collection = (collectionName) => {
            return page.locator(`//div[text()='${collectionName}']//parent::div//parent::div//input`);
        }
        this.btnSubmitCollection = page.getByRole("button", {name: "Add to Collection"})
        this.btnPost = page.getByRole("button", {name: "Post"})
        this.txtStatus = page.getByPlaceholder("What's on your mind?")
        this.closeIcon = page.locator("div.ant-modal-content span.anticon-close")
    }

    async createNewPost() {
        await this.btnCreate.click()
        await this.btnCreateNewPost.click()
    }

    async post(audience, star, allowReplying, canComment, allowRepWithLink, pinPost, collection, filePath) {
        await this.selectAudience(audience)
        await this.postSetting(allowReplying, canComment, allowRepWithLink, pinPost)
        await this.selectCollection(collection)
        await this.attachFile(filePath)
    }

    async fillStatus(status) {
        await this.txtStatus.fill(status)
    }

    async selectAudience(audience, star) {
        await this.audience.click()
        if (audience === 'EVERYONE') {
            await this.selectEveryone()
        } else if (audience === 'MEMBER') {
            await this.selectExclusiveContent(star)
        }
        await this.saveConfig()
    }

    async postSetting(allowReplying, canComment, allowRepWithLink, pinPost) {
        await this.setting.click();
        await this.toggleSetting(this.allowReplyingToggle, allowReplying);
        if (allowReplying) {
            await this.setCommentPermissions(canComment);
        }
        await this.toggleSetting(this.allowRepWithLink, allowRepWithLink);
        await this.toggleSetting(this.pinPostToggle, pinPost);
        await this.saveConfig();
    }

    async selectCollection(collectionName) {
        await this.collections.click()
        await this.collection(collectionName).click()
        await this.btnSubmitCollection.click()
    }

    async attachFile(folderPath) {
        const fileNames = fs.readdirSync(folderPath);
        const imageFiles = fileNames.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif';
        });
        const filePaths = imageFiles.map(file => path.join(folderPath, file));
        await this.btnAttach.setInputFiles(filePaths);
    }

    async selectEveryone() {
        await this.everyone.click()
    }

    async selectExclusiveContent(star) {
        await this.member.click()
        await this.starNumber.fill(star)
    }

    async setCommentPermissions(canComment) {
        if (canComment === 'FOLLOWERS') {
            await this.followerComment.click();
        } else if (canComment === 'PAID_USERS') {
            await this.paidViewerComment.click();
        }
    }

    async toggleSetting(toggle, status) {
        const currentStatus = await toggle.getAttribute("aria-checked");
        if (currentStatus !== status.toString()) {
            await toggle.click();
        }
    }

    async saveConfig() {
        await this.closeIcon.click()
    }

    async submitPost() {
        await this.btnPost.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}
