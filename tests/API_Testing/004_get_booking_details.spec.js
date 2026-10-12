import {test , expect} from "@playwright/test"


const BASE_URL='https://restful-booker.herokuapp.com';

test.skip("Get Booking Details by ID : Path Param", async ({request})=>{

    const bookingId=2

    //https://restful-booker.herokuapp.com/booking/1

    const response=await request.get(`${BASE_URL}/booking/${bookingId}`)

    const responseBody=await response.json()

    console.log(responseBody)

//validate response status and code
     expect(response.status()).toBe(200);
     expect(response.statusText()).toBe("OK");

//Validate response body

  await expect(responseBody).toHaveProperty("firstname");
  await expect(responseBody).toHaveProperty("lastname");

});

test("Get Booking Details by Name : Quary Param", async ({request})=>{


    //https://restful-booker.herokuapp.com/booking?firstname=Jim&lastname=Brown
    const firstname="Jim"
    const lastname="Brown"

    const response=await request.get(`${BASE_URL}/booking`,{
        params:{
            firstname,
            lastname
        }
    })

    const responseBody=await response.json()

    console.log(responseBody)

//validate response status and code
     expect(response.status()).toBe(200);
     expect(response.statusText()).toBe("OK");

//Verify booking Id should be a number and value greater then 0

for(const item of responseBody){
    expect(item).toHaveProperty("bookingid");

    expect(typeof item.bookingid).toBe("number");
    expect(item.bookingid).toEqual(expect.any(Number));

    expect(item.bookingid).toBeGreaterThan(0);

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
})