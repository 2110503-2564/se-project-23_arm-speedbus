import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');

  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('user5@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('http://localhost:3000/'); 

  await page.getByRole('link', { name: 'SELECT CAR' }).click();

  await page.getByRole('link', { name: 'Product Picture Getaway Car' }).click();

  await page.locator('div').filter({ hasText: /^Check-In Date$/ }).getByLabel('Choose date').click();
  await page.getByRole('gridcell', { name: '7', exact: true }).click();
  await page.getByRole('button', { name: 'Choose date', exact: true }).click();
  await page.getByRole('gridcell', { name: '9', exact: true }).click();

  await page.getByRole('button', { name: 'Book' }).click();

  await page.goto('http://localhost:3000/booking');

  await page.getByRole('textbox', { name: 'Review...' }).fill('This car so good!');
  await page.locator('svg').nth(3).click();
  await page.getByRole('button', { name: 'Review' }).click();

  await page.goto('http://localhost:3000/myReview');

  await page.waitForTimeout(3000);
});