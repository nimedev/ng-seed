'use strict'

const { NamedLazyChunksWebpackPlugin } = require('@angular/cli/plugins/webpack')
const { AngularCompilerPlugin } = require('@ngtools/webpack')
const { NamedModulesPlugin, SourceMapDevToolPlugin } = require('webpack')
const webpackKit = require('webpack-kit-nimedev')
const merge = require('webpack-merge')

const { host, port } = require('./development-url')
const setupWebpackConfigCommon = require('./webpack.config.common')

module.exports = (paths, { entryPoints, test = false }) => merge([
  setupWebpackConfigCommon(paths),
  {
    output: {
      path: paths.dist,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      crossOriginLoading: false
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: paths.src,
          loader: '@ngtools/webpack'
        }
      ]
    },
    devtool: '#inline-source-map',
    plugins: [
      new NamedLazyChunksWebpackPlugin(),
      new NamedModulesPlugin({}),
      new SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        moduleFilenameTemplate: '[resource-path]',
        fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
        sourceRoot: 'webpack:///'
      }),
      new AngularCompilerPlugin({
        mainPath: 'main.ts',
        platform: 0,
        hostReplacementPaths: {
          'environments/environment.ts': 'environments/environment.ts'
        },
        sourceMap: true,
        tsConfigPath: test ? 'src/tsconfig.spec.json' : 'src/tsconfig.app.json',
        skipCodeGeneration: true,
        compilerOptions: {}
      })
    ]
  },
  webpackKit.devServer({ host, port }),

  // Add loaders
  webpackKit.loadPostCSS({ include: paths.globalStyles }),

  // Add plugins
  webpackKit.htmlPlugin({ template: './src/index.html' }, entryPoints)
])
