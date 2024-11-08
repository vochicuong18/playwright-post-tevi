import WaitUtility from "../../utilities/WaitUtility";

export default class PostPage {
    constructor(page) {
        this.page = page;
        this.waitUtility = new WaitUtility(this.page);
        this.searchIcon = page.locator("img[src*='icon-share-alt-out-lined']")
        this.copyButton = page.locator("//img[@alt='link-share']//parent::button")
    }

    async copyLink() {
        await this.searchIcon.hover();
        await this.copyButton.click();
    }
}