Feature: Related searches for "semrush ai" on Ecosia
    As a web user
    I want to see related searches 
    So that I could refine my query 
    And learn more about the product

Background:
     Given I am on the Ecosia home page

Scenario: Related searches are shown on the All results page
    When I search for "semrush ai"
    Then I should see the "Related searches" widget
    And it shows relevant suggestions related to "semrush ai"