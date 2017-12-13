'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const setupWebpackConfigDev = require('./config/webpack.config.dev')
const setupWebpackConfigProd = require('./config/webpack.config.prod')
const setupWebpackConfigTest = require('./config/webpack.config.test')

const PATHS = {
  root: __dirname,
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  audio: path.join(__dirname, 'src/assets/audio'),
  images: path.join(__dirname, 'src/assets/images'),
  icons: path.join(__dirname, 'src/assets/icons'),
  fonts: path.join(__dirname, 'src/assets/fonts'),
  globalStyles: path.join(__dirname, 'src/styles/index.css'),
  componentStyles: path.join(__dirname, 'src/app'),
  copy: [
    {
      'context': 'src',
      'to': '',
      'from': {
        'glob': 'favicon.ico',
        'dot': true
      }
    }
  ]
}

const entryPoints = [
  'inline',
  'polyfills',
  'sw-register',
  'styles',
  'vendor',
  'main'
]

module.exports = ({ target }) => {
  if (target === 'production') {
    return setupWebpackConfigProd(PATHS, { entryPoints })
  } else if (target === 'test') {
    return setupWebpackConfigTest(PATHS, { entryPoints })
  }

  return setupWebpackConfigDev(PATHS, { entryPoints })
}
