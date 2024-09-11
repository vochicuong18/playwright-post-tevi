import WaitUtility from "../../utilities/WaitUtility";
let waitUtility

export default class {
    constructor(page) {
        this.page = page
        waitUtility = new WaitUtility(this.page);
        this.btnAddToCart = page.getByRole('button', {name: 'Add to Cart'})
        this.cartCountLoading = page.locator('span.counter.qty._block-content-loading')
    }

    async addToCart () {
        await this.btnAddToCart.click()
        await this.cartCountLoading.waitFor({state: 'attached'})
        await this.cartCountLoading.waitFor({state: 'detached'})
    }
}