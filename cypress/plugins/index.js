/// <reference types="cypress" />
require('dotenv').config()
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // modify env value

  config.env.url = process.env.REACT_APP_FRONTEND_URL
  config.env.loginUserEmail = process.env.CYPRESS_TEST_LOGIN_USER_EMAIL
  config.env.loginUserPassword = process.env.CYPRESS_TEST_LOGIN_USER_PASSWORD
  config.env.loginAdminEmail = process.env.CYPRESS_TEST_LOGIN_ADMIN_EMAIL
  config.env.loginAdminPassword = process.env.CYPRESS_TEST_LOGIN_ADMIN_PASSWORD

  // return config
  return config
}
