const {test, expect} = require('@playwright/test');



test('Lets shop ',async ({browser})=>
{  
    const context=await browser.newContext();
    const page=await context.newPage();
    const email="ravishopping@gmai.com"
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Smile@123");
    await page.getByRole("Button",{name:"login"}).click();

    const productName="ZARA COAT 3";
    const products=page.locator(".card-body");

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).
    getByRole("button",{name:"Add to cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150});
    await page.getByRole("button",{name:"India"}).nth(1).click();
    //await page.getByRole("button",{name:"PLACE ORDER"}).click();
    await page.getByText("PLACE ORDER").click();

    await page.waitForLoadState("networkidle");
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click();

    await page.locator("tbody").waitFor();

   // await page.getByPlaceholder(orderId.split('|')[1].trim()).getByRole("button",{name:"View"}).click();

  await page.locator("tbody tr").filter({hasText:orderId.split('|')[1].trim()})
  .getByText("View").click();

    const orderIdDetails=await page.locator("div .col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    //await page.pause();
      
});



