Feature: Search news about "semrush ai" on Ecosia 
    As an AI enthusiast from Germany  
    I want to filter results by news and by search region 
    So that I could find news about "semrush ai" 
  
Background: Given I am on the Ecosia home page 

Scenario: See news results for "semrush ai" in German region 
    When I search for "semrush ai" 
    And I open the "News" section 
    And "Germany" as search region
    Then the "News" section is opened
    And the search region is indicated 
    And at least 3 relevant results containing words "semrush ai" are displayed 