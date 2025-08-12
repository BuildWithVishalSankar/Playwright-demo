Feature: Amazon Laptop Search and Purchase Flow
    As a customer
    I want to search for laptops with specific filters
    So that I can find and add a suitable laptop to my cart

    Scenario: Filter and purchase HP laptop with specific specifications
        Given I am on the Amazon homepage
        When I search for "Laptops" in the search bar
        And I set the display size filter to "15 to 15.9 Inches"
        And I set the RAM size filter to "8 GB"
        And I set the brand filter to "HP"
        And I sort the products by "Avg. Customer Review"
        And I select the first product from the results
        And I click "See All Buying Options" if the button is present
        And I click the "Add to Cart" button
        And I click the "Go to Cart" button
        Then I should see filtered results for laptops
        And I should be able to proceed to checkout
