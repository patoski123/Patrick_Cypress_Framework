import BasePage from './basePage'
import secrets from '../../../cypress.env.json'

class LoginPage extends BasePage {
  static USERNAME_TEXT_FIELD = '#username'
  static H1_TEXT = 'h1'

  static acceptCookies () {
  }
}

export default LoginPage
