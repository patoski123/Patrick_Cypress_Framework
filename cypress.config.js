const { defineConfig } = require('cypress')
const fs = require('fs')
const pdf = require('pdf-parse')
const path = require('path')
const chalk = require('chalk')
const repoRoot = path.join('report/downloads')
const parsePdf = async (pdfName) => {
  const pdfPathname = path.join(repoRoot, pdfName)
  const dataBuffer = fs.readFileSync(pdfPathname)
  return await pdf(dataBuffer)
}
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const Cryptr = require('cryptr')
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const availableEnvironments = ['BUILD', 'LOCAL', 'SIT']

module.exports = defineConfig({
  env: {
    TEST_ENVIRONMENT: 'sit',

  },
  defaultCommandTimeout: 15000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  pageLoadTimeout: 60000,
  viewportWidth: 2000,
  viewportHeight: 1240,
  projectId: '',
  downloadsFolder: 'report/downloads',
  screenshotsFolder: 'report/screenshots',
  videos: false,
  chromeWebSecurity: false,
  videosFolder: 'report/videos',
  retries: {
    runMode: 0,
    openMode: 0
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.

    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },

    async setupNodeEvents (on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      })

      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)

      if (!availableEnvironments.includes(config.env.TEST_ENVIRONMENT.toUpperCase())) {
        const errorMessage = `Environment (${config.env.TEST_ENVIRONMENT.toUpperCase()}) provided is not supported. Environments available are: ${availableEnvironments}`
        console.log(chalk.bgRedBright(errorMessage))
        throw new Error(errorMessage)
      }
      console.log(chalk.bgGreen('Your tests are using these details:'))
      console.log(chalk.greenBright(`Environment: ${config.env.TEST_ENVIRONMENT.toUpperCase()}`))

      on('task', {
        // this is for checking if file exists
        fileExists ({ filename }) {
          return fs.existsSync(filename)
        },
        // this is for reading pdf content
        getPdfContent (pdfName) {
          return parsePdf(pdfName)
        },
        // this is for reading any json file
        // readJsonFile(){
        //     return JSON.parse(fs.readFileSync('', ''));
        // }
      })

      switch (config.env.TEST_ENVIRONMENT.toUpperCase()) {
        case 'BUILD':
          config.env.MAI_APP_URL = 'https://google.com'
          config.baseUrl = 'https://google.com'
          break

        case 'LOCAL':
          config.baseUrl = 'http://localhost:4010'
          break

        case 'SIT':
          config.env.MAI_APP_URL = 'https://google.com'
           config.env['api-server'] = 'https:/'
          config.baseUrl = 'https://google.com'
          break

        default:
          throw new Error(`Add environment details for ${config.env.TEST_ENVIRONMENT.toUpperCase()} environment`)
      }

      // function setSecurityCredentials (config, cred) {
      //   config.env.notificationServiceKey = cred.notificationServiceKey
      //   return config
      // }

      return config
    },
    specPattern: 'cypress/e2e/test/**/*.feature',
    excludeSpecPattern: '*.js',
     baseUrl: 'https://google.com'
  }
})
