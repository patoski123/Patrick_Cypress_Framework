class BasePage {
    // the project uses a page Object model POM for better project folder management and re-usability
    // here we will keep every web elements that is on every page in the application example: footer, header, navigation menu
    static HEADER_DIV = '[data-module="govuk-header"]';
    static signOutUser () {
      cy.get(this.SIGN_OUT).contains('Sign out').click()
    }
  // the above function clickOnLogoHeader can be called any where in the project by importing the BasePage class.
}

export default BasePage
