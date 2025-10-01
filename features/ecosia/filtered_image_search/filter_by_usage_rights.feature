Feature: Image filtering on Ecosia by color
    As a copyright owner
    I want to filter images by usage rights and date
    So that I could quickly spot cases of potential unauthorized reuse

Background:
    Given I am on the Ecosia home page

Scenario: Images can be filtered by usage rights and date
    When I search for "prowly ai tools"
    And I open the "Images" section
    And I set the usage rights to "Public domain"
    And I set the date to "Past 24 hours"
    Then the filters date and usage rights are active
    And there are no results 