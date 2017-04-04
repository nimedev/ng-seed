/**
 * Module used to process te environment variables used in webpack.
 * @module webpack-environment
 */

/* eslint-disable import/no-extraneous-dependencies */
const ip = require('ip')

// Server variables
const host = process.env.NG_SEED_HOST || ip.address()
const port = process.env.NG_SEED_PORT || 3000

// Variables to pass in DefinePlugin
const apiUrl = process.env.NG_SEED_API_URL || `http://${ip.address()}:${8080}/api`

module.exports = {
  host,
  port,
  defineEnvironment: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      NG_SEED_API_URL: JSON.stringify(apiUrl)
    }
  }
}
