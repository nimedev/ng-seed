'use strict'

const ip = require('ip')
const { HotModuleReplacementPlugin } = require('webpack')

// Server variables
const host = process.env.NG_SEED_HOST || ip.address()
const port = process.env.NG_SEED_PORT || 3000

module.exports = () => ({
  devServer: {
    contentBase: './src',
    host,
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only'
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})
