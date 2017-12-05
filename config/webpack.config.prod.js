'use strict'

const { SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack')
const { PurifyPlugin } = require('@angular-devkit/build-optimizer')
const { AngularCompilerPlugin } = require('@ngtools/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { LicenseWebpackPlugin } = require('license-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackKit = require('webpack-kit-nimedev')
const merge = require('webpack-merge')

const setupWebpackConfigCommon = require('./webpack.config.common')

module.exports = (paths, { entryPoints }) => merge([
  setupWebpackConfigCommon(paths),
  {
    output: {
      path: paths.dist,
      filename: '[name].[chunkhash:20].js',
      chunkFilename: '[id].[chunkhash:20].js',
      crossOriginLoading: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: '@angular-devkit/build-optimizer/webpack-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: [
            {
              loader: '@angular-devkit/build-optimizer/webpack-loader',
              options: {
                sourceMap: false
              }
            },
            '@ngtools/webpack'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([paths.dist], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      }),
      new CommonsChunkPlugin({
        name: 'inline',
        minChunks: null
      }),
      new CommonsChunkPlugin({
        name: 'main',
        minChunks: 2,
        async: 'common'
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => /node_modules/.test(module.context),
        chunks: ['main']
      }),
      new SuppressExtractedTextChunksWebpackPlugin(),
      new HashedModuleIdsPlugin({
        hashFunction: 'md5',
        hashDigest: 'base64',
        hashDigestLength: 4
      }),
      new ModuleConcatenationPlugin(),
      new LicenseWebpackPlugin({
        licenseFilenames: [
          'LICENSE',
          'LICENSE.md',
          'LICENSE.txt',
          'license',
          'license.md',
          'license.txt'
        ],
        perChunkOutput: false,
        outputTemplate: './node_modules/license-webpack-plugin/output.template.ejs',
        outputFilename: '3rdpartylicenses.txt',
        suppressErrors: true,
        includePackagesWithoutLicense: false,
        abortOnUnacceptableLicense: false,
        addBanner: false,
        bannerTemplate: '/*! 3rd party license information is available at <%- filename %> */',
        includedChunks: [],
        excludedChunks: [],
        additionalPackages: [],
        pattern: /^(MIT|ISC|BSD.*)$/
      }),
      new PurifyPlugin(),
      new UglifyJsPlugin({
        test: /\.js$/i,
        extractComments: false,
        sourceMap: false,
        cache: false,
        parallel: false,
        uglifyOptions: {
          output: {
            ascii_only: true,
            comments: false,
            webkit: true
          },
          ecma: 5,
          warnings: false,
          ie8: false,
          mangle: {
            safari10: true
          },
          compress: {
            comparisons: false,
            pure_getters: true,
            passes: 3
          }
        }
      }),
      new AngularCompilerPlugin({
        mainPath: 'main.ts',
        platform: 0,
        hostReplacementPaths: {
          'environments/environment.ts': 'environments/environment.prod.ts'
        },
        sourceMap: false,
        tsConfigPath: 'src/tsconfig.app.json',
        compilerOptions: {}
      })
    ]
  },

  // Extract global styles
  webpackKit.extractPostCSS({ include: paths.globalStyles }),

  // Add plugins
  webpackKit.bundleAnalyzer(),
  webpackKit.htmlPlugin({
    template: './src/index.html',
    minify: {
      caseSensitive: true,
      collapseWhitespace: true,
      keepClosingSlash: true
    }
  }, entryPoints)
])
