'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

const sortChunk = packages => (left, right) => {
  const leftIndex = packages.indexOf(left.names[0])
  const rightindex = packages.indexOf(right.names[0])
  if (leftIndex > rightindex) {
    return 1
  }
  if (leftIndex < rightindex) {
    return -1
  }
  return 0
}

/**
 * Configuration for HtmlWebpackPlugin
 */
module.exports = (options = {}, packages) => ({
  plugins: [
    new HtmlWebpackPlugin(Object.assign(
      options,
      {
        chunksSortMode: packages ? sortChunk(packages) : 'auto'
      }
    ))
  ]
})
