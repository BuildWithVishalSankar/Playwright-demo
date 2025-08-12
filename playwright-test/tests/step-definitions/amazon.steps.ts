import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";

/*
 npx playwright codegen https://amazon.in --output=amazon-raw-code.spec2.ts

 npm test
*/
setDefaultTimeout(60 * 1000);

async function wait(ms: number = 500) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function scrollAndClick(selector: any) {
    const element = await selector;
    await element.scrollIntoViewIfNeeded();
    await element.click();
}

async function scrollAndFill(selector: any, value: string) {
    const element = await selector;
    await element.scrollIntoViewIfNeeded();
    await element.fill(value);
}

Given("I am on the Amazon India homepage", async function () {
    await pageFixture.page.goto("https://www.amazon.in/");
    await wait();
});

When("I search for {string}", async function (searchTerm: string) {
    await scrollAndFill(
        pageFixture.page.getByRole("searchbox", { name: "Search Amazon.in" }),
        searchTerm
    );
    await wait();
});

When("I click the search button", async function () {
    await scrollAndClick(pageFixture.page.getByRole("button", { name: "Go", exact: true }));
    await wait();
});

When("I apply the {string} filter", async function (filterName: string) {
    await scrollAndClick(
        pageFixture.page.getByRole("link", { name: new RegExp(`Apply the filter ${filterName}`, "i") })
    );
    await wait();
});

When("I sort results by {string}", async function (sortType: string) {
    // Click the sort dropdown button
    await pageFixture.page.locator('#a-autoid-0-announce').getByText('Sort by:').click();

    // Select the sort option
    await pageFixture.page.getByLabel(sortType).getByText(sortType).click();

    await wait();
});


When("I open the first Apple MacBook Air laptop result", async function () {
    await scrollAndClick(
        pageFixture.page.getByRole("link", { name: /Apple MacBook Air Laptop:/i }).first()
    );
    await wait();
});

When("I add the laptop to the cart", async function () {
    await scrollAndClick(pageFixture.page.getByRole("button", { name: "Add to Cart", exact: true }));
    await wait();
});

When("I proceed to buy the laptop", async function () {
    await scrollAndClick(pageFixture.page.getByRole("button", { name: /Proceed to Buy/ }));
    await wait();
});
