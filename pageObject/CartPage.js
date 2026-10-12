const {test, expect} = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        this.pageWaitElement = page.locator("div li");
        //this.productNameElement = page.locator("h3:has-text('ZARA COAT 3')");
        this.productNameElement = page.locator("div[class='cartSection'] h3");
        this.checkoutBtn = page.locator("text=Checkout");

    }

    async checkout() {
        await this.pageWaitElement.first().waitFor();
        const bool = await this.productNameElement.isVisible();
        await expect(bool).toBeTruthy();
        await this.checkoutBtn.click();
    }
}
module.exports={CartPage};