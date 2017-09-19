'use strict'

/**
 * Configuration of loader for fonts
 */
module.exports = (include) => ({
  module: {
    rules: [
      {
        test: /\.woff2?$/,
        include,

        // Inline small woff files and output them below font/.
        // Set mimetype just in case.
        loader: 'url-loader',
        options: {
          name: './assets/fonts/[name].[hash].[ext]',
          limit: 30000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.(ttf|svg|eot)$/,
        include,
        loader: 'file-loader',
        options: {
          name: './assets/fonts/[name].[hash].[ext]'
        }
      }
    ]
  }
})
