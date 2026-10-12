const {test , expect}=require('@playwright/test');

test("Popup Validations", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    //hidden block
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.pause();

    //handling alerts/dialog

    page.on("dialog",dialog=>dialog.accept());//on is a listiner
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    //handling Iframes

    const framesPage=page.frameLocator("#courses-iframe");
    //or a[href*='all-access-subscription']:visible
    await framesPage.locator(".hidden a[href*='all-access-subscription']").click();
   
    //await framesPage.getByRole('button', { name: 'Close' }).click()
   // await expect(framesPage.getByText("Happy Subscribers")).toBeVisible();
//locator('iframe[name="iframe-name"]').contentFrame().getByRole('button', { name: 'Close' })

})


//screenshot
test("Screenshot and Visual Testing",async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator(".large-row-spacer .right-align fieldset").nth(1).screenshot({path:"partialScreenshot.png"})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screentshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test("Visual Testing",async ({page})=>{

    await page.goto("https://google.com");
    //first run will fail if the expected imge is not there means then it will create one
    expect(await page.screenshot()).toMatchSnapshot("landing1.png");


})