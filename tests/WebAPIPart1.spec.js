const {test, expect, request} = require('@playwright/test');
const {APIUtils}=require('./Utils/APIUtils')

const loginPayLoad= {userEmail:"ravishopping@gmai.com",userPassword:"Smile@123"} //in javscript only value needs in " " keys dont require
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a"}]}

 //if are not initialing immediately then we should use let not const
let response;

test.beforeAll(async()=>
    {
        const apiContext=await request.newContext();
        const apiUtils=new APIUtils(apiContext,loginPayLoad);
        response=await apiUtils.createOrder(orderPayLoad);
        
    });



test('Place the Order ',async ({browser})=>
{  
    const context=await browser.newContext();
    const page=await context.newPage();

    //login through API 
   await page.addInitScript(value=> {
        window.localStorage.setItem('token',value);
    },response.token);

    //directly hitting Required url coz we setted login Token already
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("li [routerlink*='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    const rows=await page.locator("tbody tr");
    //await rows.first().waitFor();

    for(let i=0;i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("[scope='row']").textContent()
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("text=View").click();
            break;
        }
    }

    const orderIdDetails=await page.locator("div .col-text").textContent();
    await page.pause();
      
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    //await page.pause();

});



