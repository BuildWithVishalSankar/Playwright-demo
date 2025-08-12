import { test, expect, Page } from '@playwright/test';

test.describe('Amazon Laptop Search and Purchase Flow', () => {
    let page: Page;

    test.beforeEach(async ({ page: testPage }) => {
        page = testPage;
        await navigateToAmazonHomepage(page);
    });

    test('Filter and purchase HP laptop with specific specifications', async () => {
        await searchForLaptops(page, 'Laptops');
        await applyFilter(page, 'Screen Size', '15 to 15.9 Inches');
        await applyFilter(page, 'RAM Memory', '8 GB');
        await applyFilter(page, 'Brand', 'HP');
        await sortBy(page, 'Avg. Customer Review');
        const productSelected = await selectFirstProduct(page);
        expect(productSelected).toBeTruthy();

        await clickSeeAllBuyingOptionsIfPresent(page);
        const addedToCart = await addToCart(page);
        expect(addedToCart).toBeTruthy();

        const navigatedToCart = await goToCart(page);
        expect(navigatedToCart).toBeTruthy();

        await verifyFilteredResultsVisible(page);
        await proceedToCheckout(page);
    });
});

// ==================== Helper Functions ====================

async function navigateToAmazonHomepage(page: Page) {
    await page.goto('https://www.amazon.com');
    try {
        await page.click('#sp-cc-accept', { timeout: 3000 });
    } catch { }
}

async function searchForLaptops(page: Page, query: string) {
    const searchBox = page.getByPlaceholder('Search');
    await expect(searchBox).toBeVisible();
    await searchBox.fill(query);

    const goButton = page.getByRole('button', { name: 'Go' }).first();

    await expect(goButton).toBeVisible();
    await goButton.click();

    // ❌ Removed unreliable wait
    // await page.waitForLoadState('networkidle');

    // ✅ Wait directly for result to show
    await expect(page.locator('[data-component-type="s-search-result"]').first()).toBeVisible({ timeout: 10000 });
}


async function applyFilter(page: Page, category: string, value: string) {
    await page.click(`text=${category}`);
    await page.waitForTimeout(1000);
    await page.click(`text=${value}`);
    await page.waitForLoadState('networkidle');
}

async function sortBy(page: Page, sortOption: string) {
    await page.click('#s-result-sort-select');
    await page.selectOption('#s-result-sort-select', { label: sortOption });
    await page.waitForLoadState('networkidle');
}

async function selectFirstProduct(page: Page) {
    const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
    try {
        await expect(firstProduct).toBeVisible();
        await firstProduct.locator('h2 a').click();
        await page.waitForLoadState('networkidle');
        return true;
    } catch {
        return false;
    }
}

async function clickSeeAllBuyingOptionsIfPresent(page: Page) {
    try {
        const button = page.locator('text=See All Buying Options');
        if (await button.isVisible({ timeout: 3000 })) {
            await button.click();
            await page.waitForLoadState('networkidle');
        }
    } catch { }
}

async function addToCart(page: Page) {
    try {
        const addToCartButton = page.locator('#add-to-cart-button, [name="submit.add-to-cart"]').first();
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();
        await page.waitForTimeout(2000);

        const closePopup = page.locator('#attach-sidesheet-close-button');
        if (await closePopup.isVisible({ timeout: 2000 })) {
            await closePopup.click();
        }
        return true;
    } catch {
        return false;
    }
}

async function goToCart(page: Page) {
    const cartSelectors = [
        'text=Go to Cart',
        '#sw-atc-details-single-container a[href*="cart"]',
        '#nav-cart',
        '[data-testid="sw-atc-goto-cart-button"]'
    ];

    for (const selector of cartSelectors) {
        try {
            const button = page.locator(selector);
            if (await button.isVisible({ timeout: 2000 })) {
                await button.click();
                await page.waitForLoadState('networkidle');
                return true;
            }
        } catch { }
    }

    // Fallback
    try {
        await page.goto('https://www.amazon.com/gp/cart/view.html');
        await page.waitForLoadState('networkidle');
        return true;
    } catch {
        return false;
    }
}

async function verifyFilteredResultsVisible(page: Page) {
    const result = page.locator('[data-component-type="s-search-result"]');
    const count = await result.count();
    expect(count).toBeGreaterThan(0);

}

async function proceedToCheckout(page: Page) {
    const checkoutButton = page.locator('text=Proceed to checkout, name=proceedToRetailCheckout');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toMatch(/.*signin|.*login|.*checkout.*/);
}
