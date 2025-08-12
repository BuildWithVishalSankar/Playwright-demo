import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('laptops');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await page.getByRole('link', { name: 'Apply the filter 8 GB to' }).click();
  await page.getByText('Sort by:Featured').click();
  await page.getByLabel('Avg. Customer Review').getByText('Avg. Customer Review').click();
  await page.getByRole('link', { name: 'Apple MacBook Air Laptop:' }).click();
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Proceed to Buy (1 item) Buy' }).click();
});