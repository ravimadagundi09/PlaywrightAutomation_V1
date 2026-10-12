const {test, expect} = require('@playwright/test');

const email="ravishopping@gmai.com";
let webContext;

//using json of the session storage ,local storage and cookies all in JSON for app like banking 
// where their will be more tokens or authorizaation
test.beforeAll(async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Smile@123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    context.storageState({path:"state.json"});
    webContext=await browser.newContext({storageState:'state.json'});

})


test('Lets shop ',async ({browser})=>
{  
   const productName="ZARA COAT 3";
   const page=await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products=page.locator(".card-body");
   const titles=await page.locator(".card-body h5 b").allTextContents();
   //console.log(await page.locator(".card-body h5 b").first().textContent());

    console.log(titles);

    for(let i=0;i<await products.count();++i){
        if (await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    //h3:has-text('ZARA COAT 3') to find text based locator using tags
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    //pressSequentially() will send characters one by one , where fill sends all at once so we will not get as auto suggestion drop down
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", {delay:150});
    const dropdown=await page.locator(".ta-results");
    await dropdown.first().waitFor();
    const optionCount=await dropdown.locator("button").count();
    for(let i=0;i<optionCount;++i){
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text===" India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    } 
    
    await expect(await page.locator(".user__name label")).toHaveText(email);
    await page.locator("text=Place Order ").click();

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


test('Test Case 2 ',async ({browser})=>
{  
   const productName="ZARA COAT 3";
   const page=await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products=page.locator(".card-body");
   const titles=await page.locator(".card-body h5 b").allTextContents();
   //console.log(await page.locator(".card-body h5 b").first().textContent());
    console.log(titles);
});
