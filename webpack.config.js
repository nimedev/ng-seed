'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const { AotPlugin } = require('@ngtools/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const opener = require('opener')
const { DefinePlugin, HashedModuleIdsPlugin, NamedModulesPlugin } = require('webpack')
const { ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const merge = require('webpack-merge')
const webpackKit = require('webpack-kit-nimedev')
const threePartyLibs = require('./config/three-party-libs')
const webpackEnv = require('./config/webpack-environment')

const entryPoints = ['polyfills', 'three-party-libs', 'vendor', 'app']
const threePartyRegExp = new RegExp(threePartyLibs.join('|'))

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'src/assets/images'),
  icons: path.join(__dirname, 'src/assets/icons'),
  fonts: path.join(__dirname, 'src/assets/fonts'),
  styles: path.join(__dirname, 'src/styles/index.css'),
  componentStyles: path.join(__dirname, 'src/app'),
  assets: [
    {
      from: path.join(__dirname, 'src/favicon.ico'),
    }, {
      from: path.join(__dirname, 'src/robots.txt'),
    },
  ],
}

const common = merge([
  // Common settings
  {
    entry: {
      app: `${PATHS.src}/main.ts`,
      polyfills: `${PATHS.src}/polyfills.ts`,
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css'],
    },

    // TypeScript loaders.
    module: {
      rules: [
        // {
        //   test: /\.ts$/,
        //   include: PATHS.src,
        //   enforce: 'pre',

        //   use: 'tslint-loader',
        // },
        {
          test: /\.ts$/,
          include: PATHS.src,

          use: '@ngtools/webpack',
        },
      ],
    },

    plugins: [
      new ProgressPlugin(),
      new DefinePlugin(Object.assign(
        {},
        webpackEnv.defineEnvironment
      )),
      new AotPlugin({
        entryModule: `${PATHS.src}/app/app.module#AppModule`,
        tsConfigPath: `${PATHS.src}/tsconfig.aot.json`,
        skipCodeGeneration: process.env.NODE_ENV === 'development',
      }),
    ],
  },
  webpackKit.loadHtml({ include: PATHS.src }),
  webpackKit.loadImages({ include: PATHS.images }),
  webpackKit.loadSvgSprite({ include: PATHS.icons }),
  webpackKit.loadFonts({ include: PATHS.fonts }),

  // CSS
  webpackKit.lintCSS({ files: 'src/**/*.css' }),

  // Load css of components
  webpackKit.loadCSS({
    include: PATHS.componentStyles,
    useExportsLoader: true,
  }),

  // Plugins
  webpackKit.htmlPlugin({ template: './src/index.html' }, entryPoints),
])

module.exports = ({ target }) => {
  // Return production configuration
  if (target === 'production') {
    return merge([
      common,
      {
        output: {
          filename: '[name].[chunkhash].js',
          chunkFilename: '[id].[chunkhash].js',
        },
        plugins: [
          new ModuleConcatenationPlugin(),
          new HashedModuleIdsPlugin(),
          new CleanWebpackPlugin([PATHS.dist], {
            // Without `root` CleanWebpackPlugin won't point to our
            // project and will fail to work.
            root: process.cwd(),
          }),
          new UglifyJsPlugin({
            compress: {
              warnings: false,
            },
          }),
        ],
      },
      webpackKit.bundleAnalyzer(),
      webpackKit.copyPlugin(PATHS.assets),
      webpackKit.extractVendor({ chunks: ['app'] }),
      webpackKit.extractVendor({
        name: 'three-party-libs',
        minChunks: module => threePartyRegExp.test(module.resource),
        chunks: ['vendor'],
      }),

      // Load global styles
      webpackKit.extractCSS({ include: PATHS.styles }),
    ])
  }

  // Run opener
  opener(`http://${webpackEnv.host}:${webpackEnv.port}`)

  // Return development configurations
  return merge([
    common,
    {
      devtool: '#inline-source-map',
      plugins: [
        new NamedModulesPlugin(),
      ],
    },
    webpackKit.devServer({
      host: webpackEnv.host,
      port: webpackEnv.port,
    }),

    // Load global styles
    webpackKit.loadCSS({ include: PATHS.styles }),
  ])
}