Feature: Login functionality
  As a user, I want to log in to the site and see a welcome or error message

  Scenario: Successful login
    Given I navigate to "https://the-internet.herokuapp.com/login"
    When I enter username as "tomsmith"
    And I enter password as "SuperSecretPassword!"
    And I click the login button
    Then the welcome message should be displayed

  Scenario: Invalid login
    Given I navigate to "https://the-internet.herokuapp.com/login"
    When I enter username as "invalidUser"
    And I enter password as "SuperSecretPassword!"
    And I click the login button
    Then the error message "Your username is invalid!" should be displayed

  Scenario: Invalid password
    Given I navigate to "https://the-internet.herokuapp.com/login"
    When I enter username as "tomsmith"
    And I enter password as "invalidPassword"
    And I click the login button
    Then the error message "Your password is invalid!" should be displayed
