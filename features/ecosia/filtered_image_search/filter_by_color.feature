Feature: Image filtering on Ecosia by color
    As a visual learner 
    I want to filter images by color
    So that I could watch images containing desired colors

Background:
    Given I am on the Ecosia home page

Scenario: Images can be filtered by color
    When I search for "prowly ai tools"
    And I open the "Images" section
    And I set the color filter to "Blue"
    Then the color filter "Blue" is active
    And images containing blue color is displayed
    And the description of the first 10 images contains words "prowly" and/or "ai tools"