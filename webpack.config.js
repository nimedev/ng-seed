// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const { AotPlugin } = require('@ngtools/webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const opener = require('opener')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackKit = require('webpack-kit-nimedev')
const webpackEnv = require('./config/webpack-environment')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'src/assets/images'),
  icons: path.join(__dirname, 'src/assets/icons'),
  fonts: path.join(__dirname, 'src/assets/fonts'),
  styles: path.join(__dirname, 'src/styles/index.css'),
  componentStyles: path.join(__dirname, 'src/app')
}

const common = merge([
  // Common settings
  {
    entry: {
      app: `${PATHS.src}/main.ts`,
      polyfills: `${PATHS.src}/polyfills.ts`
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js'
    },
    plugins: [
      new webpack.DefinePlugin(Object.assign(
        {},
        webpackEnv.defineEnvironment
      )),

      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)@angular/,
        PATHS.src
      )
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css']
    }
  },
  webpackKit.htmlPlugin({ template: './src/index.html' }, ['polyfills', 'vendor', 'app']),
  webpackKit.lintCSS({ files: 'src/**/*.css' }),
  webpackKit.loadHtml({ include: PATHS.src }),
  webpackKit.loadImages({
    include: PATHS.images,
    options: {
      name: './assets/images/[name].[hash].[ext]',
      limit: 25000
    }
  }),
  webpackKit.loadSvgSprite({
    include: PATHS.icons,
    options: {
      name: './assets/icons/[name].[hash].[ext]'
    }
  }),
  webpackKit.loadFonts({ include: PATHS.fonts }),
  webpackKit.loadAssets({ include: PATHS.src }),

  // Load css of components
  webpackKit.loadCSS({
    include: PATHS.componentStyles,
    useExportsLoader: true
  })
])

module.exports = ({ target }) => {
  // Return production configuration
  if (target === 'production') {
    return merge([
      common,
      {
        output: {
          filename: '[name].[chunkhash].js'
        },

        // TypeScript loaders.
        module: {
          rules: [{
            test: /\.ts$/,
            include: PATHS.src,
            enforce: 'pre',

            use: 'tslint-loader'
          }, {
            test: /\.ts$/,
            include: PATHS.src,

            use: '@ngtools/webpack'
          }]
        },
        plugins: [
          new webpack.HashedModuleIdsPlugin(),
          new CleanWebpackPlugin([PATHS.dist], {
            // Without `root` CleanWebpackPlugin won't point to our
            // project and will fail to work.
            root: process.cwd()
          }),
          new AotPlugin({
            entryModule: `${PATHS.src}/app/app.module#AppModule`,
            tsConfigPath: `${PATHS.src}/tsconfig.aot.json`
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ]
      },
      webpackKit.extractVendor(webpack, { chunks: ['app'] }),
      webpackKit.loadJS({ include: PATHS.src }),

      // Load global styles
      webpackKit.extractCSS({ include: PATHS.styles })
    ])
  }

  // Run opener
  opener(`http://${webpackEnv.host}:${webpackEnv.port}`)

  // Return development configurations
  return merge([
    common,
    {
      devtool: '#inline-source-map'
    },
    {
      // TypeScript loaders.
      module: {
        rules: [{
          test: /\.ts$/,
          include: PATHS.src,
          enforce: 'pre',

          use: 'tslint-loader'
        }, {
          test: /\.ts$/,
          include: PATHS.src,

          use: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: `${PATHS.src}/tsconfig.json` }
            },
            'angular2-template-loader'
          ]
        }]
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    },
    webpackKit.devServer(webpack, {
      host: webpackEnv.host,
      port: webpackEnv.port
    }),
    webpackKit.loadJS({
      include: PATHS.src,
      eslintOptions: {
        // Emit warnings over errors to avoid crashing
        // HMR on error.
        emitWarning: true
      }
    }),

    // Load global styles
    webpackKit.loadCSS({ include: PATHS.styles })
  ])
}
