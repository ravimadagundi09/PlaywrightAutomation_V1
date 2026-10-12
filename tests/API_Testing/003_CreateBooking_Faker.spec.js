import {test , expect} from '@playwright/test'

import { faker } from '@faker-js/faker'; // to generate random data npm i faker
import { DateTime } from 'luxon'

//npm install luxon or npm i luxon

const BASE_URL='https://restful-booker.herokuapp.com';

test("Create Booking with Faker data",async ({request})=>{

// Reading Data from json

const firstname= faker.person.firstName()
const lastname= faker.person.lastName();
const totalprice= faker.number.int({min:100 , max:500});
const depositpaid=faker.datatype.boolean();
const checkin= DateTime.now().toFormat("yyyy-MM-dd");
const checkout=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");
const additionalneeds= "super bowls" //this items are limited and defined so cant use random names

 const  requestPayload={
    "firstname" : firstname,
    "lastname" : lastname,
    "totalprice" : totalprice,
    "depositpaid" : depositpaid,
    "bookingdates" : {
        "checkin" : checkin,
        "checkout" : checkout
    },
    "additionalneeds" : additionalneeds
}

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





});