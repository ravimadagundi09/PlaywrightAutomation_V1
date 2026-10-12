const { test, expect } = require('@playwright/test');

//()=> anonomous function
//async = javascript is a asyncronous language so we use await to execute code step by step
// {browser} brackets to recognise it as a playwright fixtures rather then as a string

test('Browser Context Playwright test', async ({ browser }) => {

    //chrome -plugin/cookies
    //below two lines is not required if are not passing any cookies means by passing page fixture is enough as above
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //get title-assertion
    console.log(await page.title());

    await page.locator("#username").fill("rahulshetty");
    await page.locator("[name='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});

//intercepting netword about fucntion 
test.only('Lets shop ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //aborting any css call to load
    //await page.route("**/*.css",route=>route.abort());

    //await page.route("**/*.{png,jpg,jpeg}",route=>route.abort());
    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()))

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //await page.pause();
    await page.locator("#userEmail").fill("ravishopping@gmai.com");
    await page.locator("#userPassword").fill("Smile@123");
    await page.locator("#login").click();

    console.log(await page.locator(".card-body h5 b").first().textContent());


});



//test.only will execute the that test only others are skipped

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");

});


//UI contorls select:drop down , raido button

test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    //dropdown
    await dropdown.selectOption("teach");

    //radio button
    await page.locator("span.radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    console.log(await page.locator("span.radiotextsty").last().isChecked()); //or
    expect(page.locator("span.radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();

    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await page.pause();
});

//window handling
test('Child windows Hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    //promise.all will execute in parallel so that both below steps get executed at once and newPage will get context of child page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator("p.red").textContent();
    console.log(text);
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    //textContent() is for dom attached value , for entered details like user input use inputValue()
    //console.log(await page.locator("#username").textContent());
    console.log(await page.locator("#username").inputValue());
    await page.locator("[name='password']").fill("learning");
    //await page.pause();

})


//code by record and play in playwright "npx playwright codegen https://rahulshettyacademy.com"
test('test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/');
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Learning Paths' }).click();
    await page.getByText('🚀').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Start Learning' }).click();
    const page1 = await page1Promise;
    await page1.locator('.banner__inner').click();
    await page1.locator('.banner__inner').click();
    await page1.locator('.banner__inner').click();
    await page1.getByRole('button', { name: 'Enroll now' }).click();
    await page1.goto('https://checkout.teachable.com/secure/9521/checkout/order_6blcq0rt');
});