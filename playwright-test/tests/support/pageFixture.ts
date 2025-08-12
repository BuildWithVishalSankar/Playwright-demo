import { Page, BrowserContext } from "@playwright/test";

class PageFixture {
    page!: Page;        // guaranteed to be set before use
    context!: BrowserContext;
}

export const pageFixture = new PageFixture();
