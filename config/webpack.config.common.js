/**
 * Common webpack configuration for all environments
 */

'use strict'

const path = require('path')

const rxPaths = require('rxjs/_esm5/path-mapping')
const { NoEmitOnErrorsPlugin, DefinePlugin } = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const webpackKit = require('webpack-kit-nimedev')
const merge = require('webpack-merge')

const webpackEnvironment = require('./webpack-environment')

module.exports = (paths) => merge([
  {
    entry: {
      main: path.join(paths.src, 'main.ts'),
      polyfills: path.join(paths.src, 'polyfills.ts'),
      styles: path.join(paths.src, 'styles/index.css')
    },
    resolve: {
      extensions: [
        '.ts',
        '.js',
        '.json',
        '.css'
      ],
      modules: [
        './node_modules'
      ],
      symlinks: true,
      alias: rxPaths(),
      mainFields: [
        'browser',
        'module',
        'main'
      ]
    },
    resolveLoader: {
      modules: [
        './node_modules'
      ],
      alias: rxPaths()
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          include: path.join(paths.src, 'app'),
          use: 'raw-loader'
        },
        {
          test: /\.html$/,
          include: path.join(paths.src, 'index.html'),
          use: 'html-loader'
        },
        {
          test: /\.(mp3)$/,
          include: paths.audio,
          loader: 'file-loader',
          options: {
            name: './assets/audio/[name].[hash].[ext]'
          }
        }
      ]
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new ProgressPlugin(),
      new DefinePlugin(Object.assign(
        {},
        webpackEnvironment
      ))
    ],
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  },

  // Add loaders
  webpackKit.loadImages({ include: paths.images }),
  webpackKit.loadSvgSprite({ include: paths.icons }),
  webpackKit.loadFontsInline({ include: paths.fonts }),
  webpackKit.loadFonts({
    test: /\.woff$/,
    include: paths.fonts
  }),
  webpackKit.loadPostCSS({ include: paths.componentStyles }, true),

  // Add plugins
  webpackKit.copyPlugin(paths.copy),
  webpackKit.circularDependency(),
  webpackKit.lintCSS()
])
