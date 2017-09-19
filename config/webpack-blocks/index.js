/**
 * Group blocks of webpack configurations
 */

'use strict'

const devServer = require('./dev-server')
const extractCSS = require('./extract-css')
const htmlPlugin = require('./html-plugin')
const loadCSS = require('./load-css')
const loadFonts = require('./load-fonts')
const loadSvgSprite = require('./load-svg-sprite')

module.exports = {
  devServer,
  extractCSS,
  htmlPlugin,
  loadCSS,
  loadFonts,
  loadSvgSprite
}
