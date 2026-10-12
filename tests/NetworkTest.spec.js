const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const { json } = require('stream/consumers');

const loginPayLoad = { userEmail: "ravishopping@gmai.com", userPassword: "Smile@123" } //in javscript only value needs in " " keys dont require
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
//if are not initialing immediately then we should use let not const
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});



test('Place the Order ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    //login through API 
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //directly hitting Required url coz we setted login Token already
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders)
            route.fulfill(
                {
                    response,
                    body
                });

        }
        //intercepting Response->API response ->{playwright FakeResponse}-> browser-> render data on front end
    );

    await page.locator("li [routerlink*='/dashboard/myorders']").click();
    //await page.pause
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());

});



