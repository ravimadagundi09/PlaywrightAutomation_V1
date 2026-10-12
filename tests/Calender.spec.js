const {test, expect}= require("@playwright/test");


test('Calender Validation',async ({page})=>{

    const date="28";
    const monthNum="11";
    const year="2026";
    const  expectedList=[monthNum,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").first().click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNum)-1).click();
    await page.locator("//abbr[text()="+date+"]").nth(1).click();

    //.react-date-picker__inputGroup input gives 4 elements but playwright 
    // takes only 3 elements because first element is hidden
    const inputs=await page.locator(".react-date-picker__inputGroup input")

    for(let i=0;i<expectedList.length;i++){
        const value=await inputs.nth(i+1).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

})