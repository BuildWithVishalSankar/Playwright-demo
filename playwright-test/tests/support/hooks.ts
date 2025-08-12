import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

Before(async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    pageFixture.context = context;
    pageFixture.page = page;
});

After(async () => {
    await pageFixture.page.close();
    await pageFixture.context.close();
});

AfterAll(async () => {
    await browser.close();
});
