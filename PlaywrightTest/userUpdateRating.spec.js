import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');

  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('user5@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('http://localhost:3000/'); 

  await page.click('text=PROFILE'); 

  await page.click('text=MY REVIEW'); 

  await page.getByRole('button', { name: 'Edit' }).first().click(); 

  await page.getByRole('textbox', { name: 'Edit Review' }).fill('This car is so good!');

  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.getByText('Review updated successfully!')).toBeVisible();
  await expect(page.getByText('This car is so good!')).toBeVisible();

  await page.waitForTimeout(3000);
});