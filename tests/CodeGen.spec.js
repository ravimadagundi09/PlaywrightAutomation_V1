import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  await page.getByRole('button', { name: 'ADD TO CART' }).nth(2).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('combobox').selectOption('Afghanistan');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
});
