import { Page, Locator } from '@playwright/test';

export class IxigoHomePage {
    readonly page: Page;
    readonly roundTripTab: Locator;
    readonly originField: Locator;
    readonly originTextBox: Locator;
    readonly destinationTextBox: Locator;
    readonly departureDateButton: Locator;
    readonly returnDateButton: Locator;
    readonly adultsSelector: Locator;
    readonly childrenSelector: Locator;
    readonly premiumEconomyClass: Locator;
    readonly doneButton: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.roundTripTab = page.getByRole('tab', { name: 'Round Trip' });
        this.originField = page.getByTestId('originId').getByText('From');
        this.originTextBox = page.getByRole('textbox');
        this.destinationTextBox = page.getByRole('textbox');
        this.departureDateButton = page.getByRole('button', { name: '25 September 2025 4800' });
        this.returnDateButton = page.getByRole('button', { name: '29 September 2025' });
        this.adultsSelector = page.locator('div').filter({ hasText: /^Adults12 yrs or above123456789$/ }).getByTestId('2');
        this.childrenSelector = page.locator('div').filter({ hasText: /^Children2 - 12 yrs012345678$/ }).getByTestId('1');
        this.premiumEconomyClass = page.locator('div').filter({ hasText: /^Premium Economy$/ });
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async navigateToHomePage() {
        await this.page.goto('https://www.ixigo.com/');
    }

    async selectRoundTrip() {
        await this.roundTripTab.click();
    }

    async setOrigin(origin: string) {
        await this.originField.click();
        await this.originTextBox.fill(origin);
        await this.page.getByRole('listitem').filter({ hasText: 'DELNew Delhi, Delhi,' }).click();
    }

    async setDestination(destination: string) {
        await this.destinationTextBox.fill(destination);
        await this.page.getByText('BOMMumbai, Maharashtra,').click();
    }

    async selectDepartureDate() {
        await this.departureDateButton.click();
    }

    async selectReturnDate() {
        await this.returnDateButton.click();
    }

    async setPassengerCount(adults: string, children: string) {
        if (adults === '2') {
            await this.adultsSelector.click();
        }
        if (children === '1') {
            await this.childrenSelector.click();
        }
    }

    async selectClass(classType: string) {
        if (classType === 'Premium Economy') {
            await this.premiumEconomyClass.click();
        }
    }

    async completeTravellerSelection() {
        await this.doneButton.click();
    }

    async searchFlights() {
        await this.searchButton.click();
    }
}
