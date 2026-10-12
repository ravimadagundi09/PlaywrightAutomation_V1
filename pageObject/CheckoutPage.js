const {test, expect} = require('@playwright/test');
class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.selectCountry = page.locator("[placeholder*='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.userName = page.locator(".user__name label");
        this.placeOrderBtn = page.locator("text=Place Order ");
    }

    async placeOrder(userName) {
        await this.selectCountry.pressSequentially("ind", { delay: 150 });
        await this.dropdown.first().waitFor();
        const optionCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await expect(await this.userName).toHaveText(userName);
        await this.placeOrderBtn.click();
    }
}

module.exports={CheckoutPage};