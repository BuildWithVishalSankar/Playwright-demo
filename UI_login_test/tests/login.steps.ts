import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

/*
 npx cucumber-js tests/login.feature --import tests/login.steps.ts --import tests/support/world.ts --loader ts-node/esm
*/

Given('I navigate to {string}', async function (url: string) {
    await this.page.goto(url);
});

When('I enter username as {string}', async function (username: string) {
    await this.page.fill('#username', username);
});

When('I enter password as {string}', async function (password: string) {
    await this.page.fill('#password', password);
});

When('I click the login button', async function () {
    await this.page.click('button[type="submit"]');
});

Then('the welcome message should be displayed', async function () {
    await this.page.waitForTimeout(3000); // Wait for 3 seconds
    await expect(this.page.locator('.flash.success')).toContainText('You logged into a secure area!');
});

Then('the error message {string} should be displayed', async function (errorMsg: string) {
    await this.page.waitForTimeout(3000); // Wait for 3 seconds
    await expect(this.page.locator('.flash.error')).toContainText(errorMsg);
});
