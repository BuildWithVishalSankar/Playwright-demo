import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('macbook m4 air');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await page.getByRole('link', { name: 'Apply the filter 13" - 14" to' }).click();
  await page.getByRole('link', { name: 'Apply the filter 1 TB & above' }).click();
});