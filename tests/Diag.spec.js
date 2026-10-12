const { test, expect } = require('@playwright/test');


test('First Test ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://localhost:4200/");

    await page.getByText("System Settings").click();
    expect(await page.getByText("Switches").isVisible()).toBeTruthy();

    //await page.pause();

});        
