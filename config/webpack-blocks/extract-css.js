'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const minimize = {
  reduceIdents: {
    keyframes: false
  },
  zindex: false
}

/**
 * Configurations for ExtractTextPlugin
 */
module.exports = (include, name = 'styles') => {
  const extractCSS = new ExtractTextPlugin(`${name}.[contenthash].css`)

  return {
    module: {
      rules: [
        // Extract CSS during build
        {
          test: /\.css$/,
          include, // Restrict extraction process to the given paths.
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  import: false,
                  importLoaders: 1,

                  // Use css nano options
                  minimize: process.env.NODE_ENV === 'production' ? minimize : false
                }
              },
              'postcss-loader'
            ]
          })
        }
      ]
    },
    plugins: [extractCSS]
  }
}
