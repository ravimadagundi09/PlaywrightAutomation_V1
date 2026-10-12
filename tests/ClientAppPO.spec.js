const {test, expect} = require('@playwright/test');
const {LoginPage}=require("../pageObject/LoginPage");
const {DashboardPage}=require("../pageObject/DashboardPage");
const {CartPage}=require("../pageObject/CartPage");
const {CheckoutPage}=require("../pageObject/CheckoutPage");

//json=>string=>js object
const dataset=JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

//for diffrent data set
for(const data of dataset){
test(`lets shop for ${data.productName} `,async ({browser})=>
{  

    const context=await browser.newContext();
    const page=await context.newPage();
    
    //initialize pageObject for login
    const loginPage=new LoginPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(data.userName,data.password);

    //initialize DashboardObject for productsearch and add to cart
    const dashboardPage=new DashboardPage(page);
    await dashboardPage.searchProductAddCart(data.productName);
    
    //initialize CartObject for checkout
    const cartPage=new CartPage(page);
    await cartPage.checkout();

    //initialize CheckOutObject  for placing order
    const checkoutPage=new CheckoutPage(page);
    await checkoutPage.placeOrder(userName);

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("li [routerlink*='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const rows=await page.locator("tbody tr");
    //await rows.first().waitFor();

    for(let i=0;i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("[scope='row']").textContent()
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("text=View").click();
            break;
        }
    }

    const orderIdDetails=await page.locator("div .col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    //await page.pause();
});


}
