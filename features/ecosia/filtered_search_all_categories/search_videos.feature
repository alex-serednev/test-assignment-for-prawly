Feature: Search for videos about "semrush ai" on Ecosia 
    As a visual learner 
    I want to filter results by Videos
    So that I could watch videos about "semrush ai" 

Background:
    Given I am on the Ecosia home page
 
Scenario: See Videos results for "semrush ai"
    When I search for "semrush ai"
    And I open the "Videos" section
    And I select short duration
    Then the list of videos is opened 
    And at least 3 relevant results related to "semrush ai" are displayed
    And only videos with short duration (<5 mins) are displayed