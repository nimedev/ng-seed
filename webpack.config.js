'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const { AotPlugin } = require('@ngtools/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const { DefinePlugin, HashedModuleIdsPlugin, NamedModulesPlugin } = require('webpack')
const { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')

const webpackBlocks = require('./config/webpack-blocks')
const threePartyLibs = require('./config/three-party-libs')
const webpackEnvironment = require('./config/webpack-environment')

const entryPoints = ['polyfills', 'three-party-libs', 'vendor', 'app']

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'src/assets/images'),
  icons: path.join(__dirname, 'src/assets/icons'),
  fonts: path.join(__dirname, 'src/assets/fonts'),
  globalStyles: path.join(__dirname, 'src/styles/index.css'),
  componentStyles: path.join(__dirname, 'src/app'),
  assets: [
    {
      from: path.join(__dirname, 'src/favicon.ico')
    }, {
      from: path.join(__dirname, 'src/robots.txt')
    }
  ]
}

// Settings for all environments
const common = merge([
  {
    entry: {
      app: path.join(PATHS.src, 'main.ts'),
      polyfills: path.join(PATHS.src, 'polyfills.ts')
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css']
    },

    // TypeScript loaders.
    module: {
      rules: [
        {
          test: /\.html$/,
          include: PATHS.src,
          use: 'html-loader'
        },
        {
          test: /\.(jpg|png|svg)$/,
          include: PATHS.images,
          loader: 'url-loader',
          options: {
            name: './assets/images/[name].[hash].[ext]',
            limit: 25000
          }
        },
        // {
        //   test: /\.ts$/,
        //   include: PATHS.src,
        //   enforce: 'pre',

        //   use: 'tslint-loader',
        // },
        {
          test: /\.ts$/,
          include: PATHS.src,

          use: '@ngtools/webpack'
        }
      ]
    },

    plugins: [
      new ProgressPlugin(),
      new DefinePlugin(Object.assign(
        {},
        webpackEnvironment
      )),
      new StyleLintPlugin({ files: 'src/**/*.css' }),
      new AotPlugin({
        entryModule: path.join(PATHS.src, '/app/app.module#AppModule'),
        tsConfigPath: path.join(PATHS.src, '/tsconfig.aot.json'),

        // Use JIT in development and AOT in production
        skipCodeGeneration: process.env.NODE_ENV === 'development'
      })
    ]
  },
  webpackBlocks.loadSvgSprite(PATHS.icons),
  webpackBlocks.loadFonts(PATHS.fonts),

  // Load css of components
  webpackBlocks.loadCSS(PATHS.componentStyles),

  // Plugins
  webpackBlocks.htmlPlugin({ template: './src/index.html' }, entryPoints)
])

module.exports = ({ target }) => {
  // Return production configuration
  if (target === 'production') {
    return merge([
      common,
      {
        output: {
          filename: '[name].[chunkhash].js',
          chunkFilename: '[id].[chunkhash].js'
        },
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static'
          }),
          new ModuleConcatenationPlugin(),
          new HashedModuleIdsPlugin(),
          new CleanWebpackPlugin([PATHS.dist], {
            // Without `root` CleanWebpackPlugin won't point to our
            // project and will fail to work.
            root: process.cwd()
          }),
          new UglifyJsPlugin({
            compress: {
              warnings: false
            }
          }),
          new CopyWebpackPlugin(PATHS.assets),
          new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.context),
            chunks: ['app']
          }),
          new CommonsChunkPlugin({
            name: 'three-party-libs',
            minChunks: module => threePartyLibs.test(module.resource),
            chunks: ['vendor']
          })
        ]
      },

      // Extract global styles
      webpackBlocks.extractCSS(PATHS.globalStyles)
    ])
  }

  // Return development configurations
  return merge([
    common,
    {
      devtool: '#inline-source-map',
      plugins: [
        new NamedModulesPlugin()
      ]
    },
    webpackBlocks.devServer(),

    // Load global styles
    webpackBlocks.loadCSS(PATHS.globalStyles, false)
  ])
}
