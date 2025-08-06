import { test, expect } from '@playwright/test';

// Robust Playwright test for redbus.in scenario

test('Redbus AC bus booking scenario', async ({ page }) => {
  // 1. Navigate to redbus.in
  await page.goto('https://www.redbus.in/');

  // 2. Set origin city as Kozhikode
  await page.getByPlaceholder('From').click();
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder="From"]');
    if (input && 'value' in input) {
      (input as HTMLInputElement).value = 'Kozhikode';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.getByText('Kozhikode', { exact: true }).click();

  // 3. Set destination city as Bengaluru
  await page.getByPlaceholder('To').click();
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder="To"]');
    if (input && 'value' in input) {
      (input as HTMLInputElement).value = 'Bengaluru';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.getByText('Bengaluru', { exact: true }).click();

  // 4. Set travel date as any day in first week of September (e.g., 1st Sep 2025)
  await page.getByText('Date').click();
  // Move to September if not already
  while (
    !(await page.getByRole('button', { name: /September 2025/ }).isVisible())
  ) {
    await page.getByRole('button', { name: /Next month/ }).click();
  }
  await page.getByRole('button', { name: /^1$/ }).click();

  // 5. Search buses
  await page.getByRole('button', { name: /Search/ }).click();

  // 6. Filter the AC buses (robust selector, not using count)
  await page.getByRole('button', { name: /^AC( |\().*/i }).click();

  // 7. Sort by price (optional, to ensure cheapest is first)
  const sortByPrice = await page.getByText('Sort by:').isVisible();
  if (sortByPrice) {
    await page.getByRole('button', { name: /Price/i }).click();
  }

  // 8. View seats for the cheapest AC bus
  const viewSeatsButtons = await page
    .locator('button', { hasText: 'View seats' })
    .all();
  await viewSeatsButtons[0].click();

  // 9. Close login popup if it appears
  const loginPopup = page.locator('button[aria-label="Close"]');
  if (await loginPopup.isVisible()) {
    await loginPopup.click();
  } else {
    // fallback for icon button
    const closeIcon = page.locator('button', { hasText: '' });
    if (await closeIcon.isVisible()) {
      await closeIcon.click();
    }
  }

  // 10. Select the first available seat in the upper deck
  const upperDeckSeat = page
    .locator('button', { hasText: /^Seat number U/ })
    .filter({ hasText: 'available' });
  await upperDeckSeat.first().click();

  // 11. Assert seat is selected (optional, robust)
  await expect(upperDeckSeat.first()).toHaveAttribute('aria-pressed', 'true');
});
