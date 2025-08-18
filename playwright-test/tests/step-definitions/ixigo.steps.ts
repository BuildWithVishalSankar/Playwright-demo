import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";
import { IxigoHomePage } from "../page-objects/ixigo-home-page";
import { IxigoSearchResultsPage } from "../page-objects/ixigo-search-results-page";
import { IxigoBookingPage } from "../page-objects/ixigo-booking-page";

setDefaultTimeout(60 * 1000);

let ixigoHomePage: IxigoHomePage;
let ixigoSearchResultsPage: IxigoSearchResultsPage;
let ixigoBookingPage: IxigoBookingPage;

async function wait(ms: number = 1000) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

Given('I am on the Ixigo homepage', async function () {
    ixigoHomePage = new IxigoHomePage(pageFixture.page);
    ixigoSearchResultsPage = new IxigoSearchResultsPage(pageFixture.page);
    ixigoBookingPage = new IxigoBookingPage(pageFixture.page);
    await ixigoHomePage.navigateToHomePage();
});

When('I select {string} option', async function (tripType: string) {
    if (tripType === 'Round Trip') {
        await ixigoHomePage.selectRoundTrip();
    }
});

When('I set origin as {string}', async function (origin: string) {
    await ixigoHomePage.setOrigin(origin);
});

When('I set destination as {string}', async function (destination: string) {
    await ixigoHomePage.setDestination(destination);
});

When('I select departure date as {string}', async function (departureDate: string) {
    await ixigoHomePage.selectDepartureDate();
});

When('I select return date as {string}', async function (returnDate: string) {
    await ixigoHomePage.selectReturnDate();
});

When('I set passenger count as {string} adults and {string} children', async function (adults: string, children: string) {
    await ixigoHomePage.setPassengerCount(adults, children);
});

When('I select {string} class', async function (classType: string) {
    await ixigoHomePage.selectClass(classType);
    await ixigoHomePage.completeTravellerSelection();
});

When('I search for flights', async function () {
    await ixigoHomePage.searchFlights();
    await wait(3000); // Wait for search results to load
});

When('I apply {string} filter', async function (filterType: string) {
    if (filterType === 'Free meal available') {
        await ixigoSearchResultsPage.applyFreeMealFilter();
        await wait(2000); // Wait for filter to apply
    } else if (filterType === 'Non-Stop') {
        await ixigoSearchResultsPage.applyNonStopFilter();
        await wait(2000); // Wait for filter to apply
    }
});

When('I select the cheapest Air India outbound flight', async function () {
    await ixigoSearchResultsPage.selectOutboundFlight();
});

When('I select the cheapest Air India return flight', async function () {
    await ixigoSearchResultsPage.selectReturnFlight();
});

When('I view flight details', async function () {
    await ixigoSearchResultsPage.viewFlightDetails();
});

When('I check cancellation policy', async function () {
    await ixigoSearchResultsPage.checkCancellationPolicy();
});

When('I check rescheduling policy', async function () {
    await ixigoSearchResultsPage.checkReschedulingPolicy();
});

When('I view terms and conditions', async function () {
    await ixigoSearchResultsPage.viewTermsAndConditions();
    await ixigoSearchResultsPage.hideTermsAndConditions();
});

When('I close flight details', async function () {
    await ixigoSearchResultsPage.closeFlightDetails();
});

When('I proceed to book the flight', async function () {
    await ixigoSearchResultsPage.proceedToBook();
    await wait(3000); // Wait for booking page to load
});

When('I select {string} payment option', async function (paymentOption: string) {
    await ixigoBookingPage.selectPaymentOption(paymentOption);
});

When('I view available offers', async function () {
    await ixigoBookingPage.viewAvailableOffers();
});

When('I close offers popup', async function () {
    await ixigoBookingPage.closeOffersPopup();
});

Then('I should be able to continue with the booking', async function () {
    await ixigoBookingPage.continueBooking();
    // Add verification that we're on the next step of booking process
    await expect(pageFixture.page).toHaveURL(/.*ixigo\.com.*/);
});
