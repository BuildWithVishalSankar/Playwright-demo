/*
Command -  npx cucumber-js tests --require-module ts-node/register --require tests/support/world.ts --require tests/step_definitions/*.ts
*/
When('I sort the results by price (if available)', async function () {
  const page = this.page;
  // Try to find and click the 'Sort by' dropdown or button
  const sortByDropdown = page.locator('text=Sort by:');
  if (await sortByDropdown.isVisible({ timeout: 3000 })) {
    // Try to click the 'Price' option/button
    const priceBtn = page.getByRole('button', { name: /Price/i });
    if (await priceBtn.isVisible({ timeout: 3000 })) {
      await priceBtn.click();
    }
  }
});
// Step: I set the origin city to {string}
When('I set the origin city to {string}', async function (city) {
  const page = this.page;
  // Click the 'From' button
  const fromBtn = await page.getByRole('button', { name: /from/i });
  await fromBtn.click();
  // Wait a bit to ensure input is focused
  await page.waitForTimeout(2000);
  // Type the city name all at once (input should be focused after clicking button)
  await page.keyboard.type(city, { delay: 100 });
  // Wait for the suggestion containing the full city name and click it
  const suggestion = page.locator(
    `div[role="dialog"] [role="option"]:has-text("${city}")`
  );
  await suggestion.first().waitFor({ state: 'visible', timeout: 5000 });
  await suggestion.first().click();
});

// Step: I confirm the origin city is selected
When('I confirm the origin city is selected', async function () {
  const page = this.page;
  // Check that the 'From' button now shows the selected city
  const fromBtn = await page.getByRole('button', { name: /from/i });
  await fromBtn.waitFor({ state: 'visible', timeout: 5000 });
  const text = await fromBtn.textContent();
  if (!text || !/Kozhikode/i.test(text)) {
    throw new Error('Origin city not selected as Kozhikode');
  }
});

// Step: I set the destination city to {string}
When('I set the destination city to {string}', async function (city) {
  const page = this.page;
  // Click the correct 'To' button (not the swap icon)
  // Use Playwright's locator API to filter for the correct 'To' button (not swap)
  const toBtn = page
    .locator('role=button')
    .filter({ hasText: /^\s*To/i })
    .first();
  await toBtn.waitFor({ state: 'visible', timeout: 5000 });
  await toBtn.click();
  // Wait a bit to ensure input is focused
  await page.waitForTimeout(400);
  // Type the city name all at once (input should be focused after clicking button)
  await page.keyboard.type(city, { delay: 100 });
  // Wait for the suggestion containing the full city name and click it
  const suggestion = page.locator(
    `div[role="dialog"] [role="option"]:has-text("${city}")`
  );
  await suggestion.first().waitFor({ state: 'visible', timeout: 5000 });
  await suggestion.first().click();
});
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(20000); // 20 seconds for all steps
import { expect } from '@playwright/test';

Given('I navigate to {string}', async function (url) {
  await this.page.goto(url);
});

When('I confirm the destination city is selected', async function () {
  const cityOption = this.page.getByText('Bengaluru', { exact: true });
  await cityOption.waitFor({ state: 'visible', timeout: 10000 });
  await cityOption.click();
});

When('I open the date picker', async function () {
  // Use a more specific locator for the 'Date of Journey' button
  const dateBtn = this.page.getByRole('button', { name: /date of journey/i });
  await dateBtn.waitFor({ state: 'visible', timeout: 10000 });
  await dateBtn.click();
});

When('I select the first day of September 2025', async function () {
  const page = this.page;
  // Ensure the date picker is open (open if not already)
  const pickerVisible = await page
    .getByRole('button', { name: /Next month/ })
    .isVisible()
    .catch(() => false);
  if (!pickerVisible) {
    const dateBtn = page.getByRole('button', { name: /date of journey/i });
    await dateBtn.waitFor({ state: 'visible', timeout: 10000 });
    await dateBtn.click();
    await page.waitForTimeout(400);
  }
  // Click 'Next month' until the desired month/year is visible
  let monthFound = false;
  const targetMonth = 'September 2025';
  for (let i = 0; i < 3; i++) {
    const monthLabel = page.getByText(targetMonth);
    if (await monthLabel.isVisible().catch(() => false)) {
      monthFound = true;
      break;
    }
    const nextMonthBtn = page.getByRole('button', { name: /Next month/i });
    await nextMonthBtn.waitFor({ state: 'visible', timeout: 10000 });
    await nextMonthBtn.scrollIntoViewIfNeeded();
    await nextMonthBtn.click();
    await page.waitForTimeout(800);
  }
  if (!monthFound) {
    throw new Error(`Could not find calendar for ${targetMonth}`);
  }

  // Find the calendar panel for the correct month
  const monthLabel = page.getByText(targetMonth);
  await monthLabel.waitFor({ state: 'visible', timeout: 10000 });
  const panel = monthLabel.locator(
    'xpath=ancestor::*[contains(@class, "DayPicker-Month")]'
  );
  // Find all enabled buttons in the panel
  const allBtns = await panel.locator('button:enabled').all();
  for (const btn of allBtns) {
    const text = (await btn.textContent())?.trim();
    if (text === '1') {
      await btn.waitFor({ state: 'visible', timeout: 10000 });
      await btn.click();
      return;
    }
  }
  throw new Error("Could not find enabled '1' button in September 2025 panel");
});

When('I search for buses', async function () {
  const searchBtn = this.page.getByRole('button', { name: /Search/ });
  await searchBtn.waitFor({ state: 'visible', timeout: 10000 });
  await searchBtn.click();
});

When('I filter the results to show only AC buses', async function () {
  const acBtn = this.page.getByRole('button', { name: /^AC( |\().*/i });
  await acBtn.waitFor({ state: 'visible', timeout: 10000 });
  await acBtn.click();
});

When('I sort the results by price (if available)', async function () {
  const sortByPrice = await this.page.getByText('Sort by:').isVisible();
  if (sortByPrice) {
    await this.page.getByRole('button', { name: /Price/i }).click();
  }
});

When('I view seats for the cheapest AC bus', async function () {
  const viewSeatsBtns = this.page.locator('button', { hasText: 'View seats' });
  await viewSeatsBtns.first().waitFor({ state: 'visible', timeout: 10000 });
  await viewSeatsBtns.first().click();
});

When('I close the login popup if it appears', async function () {
  const loginPopup = this.page.locator('button[aria-label="Close"]');
  if (await loginPopup.isVisible()) {
    await loginPopup.waitFor({ state: 'visible', timeout: 10000 });
    await loginPopup.click();
  } else {
    const closeIcon = this.page.locator('button', { hasText: '' });
    if (await closeIcon.isVisible()) {
      await closeIcon.waitFor({ state: 'visible', timeout: 10000 });
      await closeIcon.click();
    }
  }
});

When('I select the first available seat in the upper deck', async function () {
  const upperDeckSeat = this.page
    .locator('button', { hasText: /^Seat number U/ })
    .filter({ hasText: 'available' });
  await upperDeckSeat.first().waitFor({ state: 'visible', timeout: 10000 });
  await upperDeckSeat.first().click();
  this.selectedSeat = upperDeckSeat.first();
});

Then('the seat should be selected', async function () {
  await expect(this.selectedSeat).toHaveAttribute('aria-pressed', 'true');
});
