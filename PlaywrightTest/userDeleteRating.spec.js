import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');

  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('user5@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('http://localhost:3000/'); 

  await page.getByText('PROFILE').click();

  await page.getByRole('link', { name: 'MY REVIEW' }).click();
  
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  
  await expect(page.getByText('Review deleted successfully!')).toBeVisible();
  
  await page.reload();
  await expect(page.getByText('Great experience!')).not.toBeVisible();
});