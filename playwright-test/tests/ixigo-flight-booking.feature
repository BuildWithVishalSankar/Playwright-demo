Feature: Ixigo Flight Booking
  As a traveler
  I want to search and book a round trip flight
  So that I can complete my travel booking

  Background:
    Given I am on the Ixigo homepage

  Scenario: Search and book a round trip flight with filters
    When I select "Round Trip" option
    And I set origin as "delhi"
    And I set destination as "mumbai"
    And I select departure date as "25 September 2025"
    And I select return date as "29 September 2025"
    And I set passenger count as "2" adults and "1" children
    And I select "Premium Economy" class
    And I search for flights
    And I apply "Free meal available" filter
    And I apply "Non-Stop" filter
    And I select the cheapest Air India outbound flight
    And I select the cheapest Air India return flight
    And I view flight details
    And I check cancellation policy
    And I check rescheduling policy
    And I view terms and conditions
    And I close flight details
    When I proceed to book the flight
    And I select "NEWFLY" payment option
    And I view available offers
    And I close offers popup
    Then I should be able to continue with the booking
