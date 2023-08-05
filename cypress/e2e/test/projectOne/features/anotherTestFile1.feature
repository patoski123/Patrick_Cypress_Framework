Feature: featureName
  what the feature is testing

  Scenario: Verify that user can use the google search engine
    Given I navigate to google homepage
    When I Search for the word "BBC news"
    Then The search result should include "BBC news"