import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');

  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('admin1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('http://localhost:3000/'); 

  await page.context().storageState({ path: 'admin-auth.json' });

});