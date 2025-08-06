Feature: Redbus AC bus booking scenario
  As a user, I want to book an AC bus ticket from Kozhikode to Bengaluru on redbus.in, filter for AC buses, and select a seat in the upper deck, handling all popups and dynamic content robustly.

  Scenario: Book an AC bus ticket from Kozhikode to Bengaluru
    Given I navigate to "https://www.redbus.in/"
    When I set the origin city to "Kozhikode"
    And I confirm the origin city is selected
    And I set the destination city to "Bengaluru"
    And I confirm the destination city is selected
    And I open the date picker
    And I select the first day of September 2025
    And I search for buses
    And I filter the results to show only AC buses
    And I sort the results by price (if available)
    And I view seats for the cheapest AC bus
    And I close the login popup if it appears
    And I select the first available seat in the upper deck
    Then the seat should be selected
