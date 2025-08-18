import { Page, Locator } from '@playwright/test';

export class IxigoSearchResultsPage {
    readonly page: Page;
    readonly freeMealFilter: Locator;
    readonly nonStopFilter: Locator;
    readonly outboundFlight: Locator;
    readonly returnFlight: Locator;
    readonly flightDetailsButton: Locator;
    readonly cancellationTab: Locator;
    readonly reschedulingTab: Locator;
    readonly viewTermsButton: Locator;
    readonly hideTermsButton: Locator;
    readonly closeDetailsButton: Locator;
    readonly bookButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.freeMealFilter = page.getByRole('listitem').filter({ hasText: 'Free meal available' }).getByRole('checkbox');
        this.nonStopFilter = page.getByRole('listitem').filter({ hasText: 'Non-Stop' }).getByRole('checkbox');
        this.outboundFlight = page.getByText('CheapestAir India13:15DEL2h');
        this.returnFlight = page.getByText('CheapestAir India11:50BOM2h');
        this.flightDetailsButton = page.getByText('Flight Details');
        this.cancellationTab = page.getByRole('tab', { name: 'Cancellation' });
        this.reschedulingTab = page.getByRole('tab', { name: 'Rescheduling' });
        this.viewTermsButton = page.getByRole('button', { name: 'View Terms & Conditions' });
        this.hideTermsButton = page.getByRole('button', { name: 'Hide Terms & Conditions' });
        this.closeDetailsButton = page.locator('#portal-root').getByTestId('CloseIcon');
        this.bookButton = page.getByRole('button', { name: 'Book' });
    }

    async applyFreeMealFilter() {
        await this.freeMealFilter.check();
    }

    async applyNonStopFilter() {
        await this.nonStopFilter.check();
    }

    async selectOutboundFlight() {
        await this.outboundFlight.click();
    }

    async selectReturnFlight() {
        await this.returnFlight.click();
    }

    async viewFlightDetails() {
        await this.flightDetailsButton.click();
    }

    async checkCancellationPolicy() {
        await this.cancellationTab.click();
    }

    async checkReschedulingPolicy() {
        await this.reschedulingTab.click();
    }

    async viewTermsAndConditions() {
        await this.viewTermsButton.click();
    }

    async hideTermsAndConditions() {
        await this.hideTermsButton.click();
    }

    async closeFlightDetails() {
        await this.closeDetailsButton.click();
    }

    async proceedToBook() {
        await this.bookButton.click();
    }
}
