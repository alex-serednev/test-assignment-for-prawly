Feature: Image filtering on Ecosia by color
    As a content web developer
    I want to filter images by color
    So that I could use these images in an article

Background:
    Given I am on the Ecosia home page

Scenario: Images can be filtered by size and type
    When I search for "prowly ai tools"
    And I open the "Images" section
    And I set the size to "Large"
    And I set the type to "Transparent"
    Then the filters "Size" and "Type" are active
    And large images with transparent background are displayed
    And the description of all images contain words "prowly" and/or "ai tools"