'use strict'

const merge = require('webpack-merge')

const setupWebpackConfigDev = require('./webpack.config.dev')

module.exports = (paths, { entryPoints }) => {
  const testConfig = merge([
    setupWebpackConfigDev(paths, { entryPoints, test: true }),
    {
      module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: [
              /\.(e2e|spec)\.ts$/,
              /node_modules/
            ],
            options: { esModules: true },
            enforce: 'post'
          }
        ]
      }
    }
  ])
  testConfig.entry = undefined

  return testConfig
}
