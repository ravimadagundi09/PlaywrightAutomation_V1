class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body h5 b");
        this.cart = page.locator("[routerlink='/dashboard/cart']")
    }

    async searchProductAddCart(productName) {
        const titles = await this.productText.allTextContents();
        console.log(titles);

        //zara coat 3
        for (let i = 0; i < await this.products.count(); ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        
    }

    async navigateToCart(){
        await this.cart.click();
    }
}
module.exports={DashboardPage};