import {test , expect} from '@playwright/test'
import fs from 'fs'

const BASE_URL="https://restful-booker.herokuapp.com";

test("Create Booking with Json File data",async ({request})=>{

// Reading Data from json

const jsonFile="test_data/post_request_body.json"
const  requestPayload=JSON.parse(fs.readFileSync(jsonFile,'utf-8'));

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

await expect(booking).toMatchObject({
    "firstname" : requestPayload.firstname,
    "lastname" : requestPayload.lastname,
    "totalprice" : requestPayload.totalprice,
    "depositpaid" : requestPayload.depositpaid,
    "bookingdates" : requestPayload.bookingdates,
    "additionalneeds" : requestPayload.additionalneeds
});



//validate booking dates

await expect(booking.bookingdates).toMatchObject(requestPayload.bookingdates);

await expect(booking.bookingdates).toMatchObject( {
        "checkin" :requestPayload.bookingdates.checkin ,
        "checkout" : requestPayload.bookingdates.checkout
    })





})