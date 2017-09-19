'use strict'

const minimize = {
  reduceIdents: {
    keyframes: false
  },
  zindex: false
}

/**
 * Configuration of loader for css files
 */
module.exports = (include, exportsLoader = true) => ({
  module: {
    rules: [{
      test: /\.css$/,
      include, // Restrict extraction process to the given paths.
      use: [
        exportsLoader ? 'exports-loader?module.exports.toString()' : 'style-loader',
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
    }]
  }
})
