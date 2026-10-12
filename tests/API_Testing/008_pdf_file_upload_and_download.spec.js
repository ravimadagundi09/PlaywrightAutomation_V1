/*
File Upload & Download using API Chaining
API Reference:
https://fakeapi.platzi.com/en/rest/files/
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';
import pdfParse from 'pdf-parse';

test.describe.serial('File Upload & Download', () => {

    let uploadedPdfFile

    test('Upload PDF File', async ({ request }) => {

        const response = await request.post(
            'https://api.escuelajs.co/api/v1/files/upload',
            {
                multipart: {
                    file: {
                        name: 'Sample.pdf',
                        mimeType: 'application/pdf',
                        buffer: fs.readFileSync('./uploads/Sample.pdf')
                    }
                }
            }
        );

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.originalname).toBe('Sample.pdf');

        uploadedPdfFile = responseBody.filename;

        console.log("Uploaded PDF File:", uploadedPdfFile);
    });


    //========================================================
    // Download PDF File (API Chaining)
    //========================================================



    test('Download Uploaded PDF File', async ({ request }) => {

        expect(uploadedPdfFile).toBeTruthy();
        //console.log(pdfParse);

        const response = await request.get(
            `https://api.escuelajs.co/api/v1/files/${uploadedPdfFile}`
        );

        expect(response.status()).toBe(200);

        const pdfBuffer = Buffer.from(await response.body());

        const pdfData = await pdfParse(pdfBuffer);

        expect(pdfData.text).toContain(
            'welcome to Palywright with TypeScript'
        );
    });


});