import { When, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

When(/^I navigate to google homepage$/, function (taskStatus, taskName) {
  cy.visit('/')
})

When(/^I Search for the word "([^"]*)"$/, function (searchWord) {
   cy.get('#search').type(searchWord)
   cy.get('.searchIcon').click()
})

When(/^The search result should include "([^"]*)"$/, function (searchWord) {
   cy.get('div').contains(searchWord).should('be.visible')
})

// FYI : the locators are a sample dummy but it gives the illustration on how to locate element in
// Cypress