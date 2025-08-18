Feature: Purchase a laptop from Amazon India

    Scenario: Search and purchase a laptop
        Given I am on the Amazon India homepage
        When I search for "laptops"
        And I click the search button
        And I sort results by "Avg. Customer Review"
        And I apply the "8 GB to" filter
        And I open the first Apple MacBook Air laptop result
        And I add the laptop to the cart
        And I proceed to buy the laptop
