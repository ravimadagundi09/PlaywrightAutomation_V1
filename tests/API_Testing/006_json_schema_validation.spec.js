/*
Prerequisites:
Install the required packages:
      npm install ajv


AJV is used for JSON Schema validation.
AJV stands for "Another JSON Schema Validator".

ajv.compile(schema) returns a validator function.
validate(data) checks if the response matches the schema.
*/

import { test, expect } from "@playwright/test"
import Ajv from "ajv"

test("Schema Validation", async ({ request }) => {

    //step 1: send request and get the response
    const response = await request.get('https://mocktarget.apigee.net/json')
    const responseBody = await response.json()
    console.log(responseBody);

    //step 2: define the schema


    const schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    }

    //step 3: check response against schema
    const ajv = new Ajv()
    const validate = ajv.compile(schema)//returns a validator function
    const isvalid = validate(responseBody) //checks if the response matches the schema
    expect(isvalid).toBeTruthy(); // assertion

})

//Example 2:  

test.only('Validate JSON response with schema2', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const responsebody = await response.json();
    console.log(responsebody)

    // Define the JSON schema
    const schema = {
        type: 'object',
        properties: {
            userId: { type: 'integer' },
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
        },
        required: ['userId', 'id', 'title', 'body'],
        additionalProperties: false, // dose not allow extra fields or proterties from reponse and fail TC and vice-versa
    };

    const ajv = new Ajv();   // Initialize Ajv object
    const validate = ajv.compile(schema); //returns a validator function
    const isValid = validate(responsebody); //checks if the response matches the schema

    expect(isValid).toBeTruthy();

});


