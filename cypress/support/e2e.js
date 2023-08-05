// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import dayjs from 'dayjs' // since moment has been depreciated dayjs is the best alternative.
import utc from 'dayjs/plugin/utc'
import localeData from 'dayjs/plugin/localeData'
import updateLocale from 'dayjs/plugin/updateLocale'
import isBetween from 'dayjs/plugin/isBetween'
import dayjsBusinessDays from 'dayjs-business-days'

Cypress.dayjs = dayjs()
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.extend(isBetween)
dayjs.extend(dayjsBusinessDays)
dayjs.updateLocale('en', {
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
})
Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

beforeEach(() => {
  Cypress.env('testDataArray', [])
})
afterEach(() => {

})
