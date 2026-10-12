import {test , expect} from '@playwright/test'

const BASE_URL="https://restful-booker.herokuapp.com";

test("Create Booking with static data @API",async ({request})=>{

    const  requestPayload={
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
};

//send post request

const response=await request.post( `${BASE_URL}/booking/`,{data:requestPayload});

//extract json body from response

const responseBody=await response.json();

//print response
console.log(responseBody);

//Validate status code/response

await expect(response.status()).toBe(200);
await expect(response.statusText()).toBe("OK")

//Validate response body

await expect(responseBody).toHaveProperty("bookingid");
await expect(responseBody).toHaveProperty("booking");

//assertion inside a assertion
await expect(responseBody.bookingid).toEqual(expect.any(Number))

//validate booking fields
const booking=await responseBody.booking

await expect(booking).toMatchObject(requestPayload);

//validate booking dates

await expect(booking.bookingdates).toMatchObject(requestPayload.bookingdates);

await expect(booking.bookingdates).toMatchObject( {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    });





})