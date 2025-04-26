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
  await page.getByRole('gridcell', { name: '5', exact: true }).click();
  await page.getByRole('button', { name: 'Choose date', exact: true }).click();
  await page.getByRole('gridcell', { name: '6', exact: true }).click();

  await page.getByRole('button', { name: 'Book' }).click();

  await page.goto('http://localhost:3000/booking');

  await page.locator('div:nth-child(6) > div:nth-child(2) > div > .mt-4 > div > .space-y-2 > div > svg:nth-child(5) > path').click();
  await page.getByRole('textbox', { name: 'Review...' }).nth(4).fill("Great experience!");
  await page.getByRole('button', { name: 'Review' }).click();

  await expect(page.getByText('Review added successfully!')).toBeVisible();

  await page.goto('http://localhost:3000/myReview');

  await expect(page.getByText('Great experience!')).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  
  await expect(page.getByText('Review deleted successfully!')).toBeVisible();
  
  await page.reload();
  await expect(page.getByText('Great experience!')).not.toBeVisible();
});