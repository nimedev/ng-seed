'use strict'

const ip = require('ip')

const host = process.env.NG_SEED_HOST || ip.address()
const port = process.env.NG_SEED_PORT || 4200

module.exports = {
  host,
  port
}
