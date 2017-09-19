/**
 * Module used to process te environment variables used in webpack.
 */

'use strict'

module.exports = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}
