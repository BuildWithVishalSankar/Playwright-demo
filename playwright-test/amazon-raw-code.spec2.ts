import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('laptops');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await page.goto('https://www.amazon.in/s?k=laptops&crid=2M7ZVA10EWW4B&sprefix=laptops%2Caps%2C547&ref=nb_sb_noss_2');
  await page.locator('#a-autoid-0-announce').getByText('Sort by:').click();
  await page.getByLabel('Avg. Customer Review').getByText('Avg. Customer Review').click();
});