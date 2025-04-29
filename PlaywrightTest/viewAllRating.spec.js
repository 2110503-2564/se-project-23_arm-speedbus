import { test, expect } from '@playwright/test';

test('Guest user can view car ratings and reviews', async ({ page }) => {

  await page.goto('http://localhost:3000/car');


  await page.click('text=view review ➜'); 

  await page.waitForSelector('[data-testid="rating-section"]', { timeout: 5000 });

  await page.waitForTimeout(3000);

  const ratingSection = await page.locator('[data-testid="rating-section"]'); // use proper selector
  await expect(ratingSection).toBeVisible();
});
