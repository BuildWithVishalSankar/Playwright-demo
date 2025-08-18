import { Page, Locator } from '@playwright/test';

export class IxigoBookingPage {
    readonly page: Page;
    readonly newflyPaymentOption: Locator;
    readonly viewOffersButton: Locator;
    readonly closeOffersButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newflyPaymentOption = page.getByRole('radio', { name: 'NEWFLY' });
        this.viewOffersButton = page.getByRole('button', { name: 'View All Offers' });
        this.closeOffersButton = page.getByTestId('CloseIcon');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async selectPaymentOption(option: string) {
        if (option === 'NEWFLY') {
            await this.newflyPaymentOption.check();
        }
    }

    async viewAvailableOffers() {
        // Click the empty button first (seems to be part of the flow)
        await this.page.getByRole('button').filter({ hasText: /^$/ }).click();
        await this.viewOffersButton.click();
    }

    async closeOffersPopup() {
        await this.closeOffersButton.click();
    }

    async continueBooking() {
        await this.continueButton.click();
    }
}
