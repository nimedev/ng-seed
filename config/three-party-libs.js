'use strict'

// modules to separate from vendor module.
const libs = [
  'rxjs'
]

// A regex to use in webpack configuartion
module.exports = new RegExp(libs.join('|'))
