// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const { AotPlugin } = require('@ngtools/webpack')
const ip = require('ip')
const opener = require('opener')
const stylelint = require('stylelint')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackKit = require('webpack-kit-nimedev')

const host = process.env.NG_SEED_HOST || ip.address()
const port = process.env.NG_SEED_PORT || 3000
const apiUrl = process.env.NG_SEED_API_URL || `http://${ip.address()}:${8080}/api`
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NG_SEED_API_URL: JSON.stringify(apiUrl)
        }
      }),

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
  webpackKit.htmlPlugin({ template: './src/index.html' }),
  webpackKit.lintCSS(stylelint, { include: PATHS.src }),
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

          // Angular AOT
          new AotPlugin({
            entryModule: `${PATHS.src}/app/app.module#AppModule`,
            tsConfigPath: `${PATHS.src}/tsconfig.aot.json`
          })
        ]
      },
      webpackKit.extractVendor(webpack, { chunks: ['app'] }),
      webpackKit.cleanPlugin(PATHS.dist),
      webpackKit.loadJS({ include: PATHS.src }),
      webpackKit.minify(webpack),

      // Load global styles
      webpackKit.extractCSS({ include: PATHS.styles })
    ])
  }

  // Run opener
  opener(`http://${host}:${port}`)

  // Return development configurations
  return merge([
    common,
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
    webpackKit.generateSourcemaps('#inline-source-map'),
    webpackKit.devServer(webpack, { host, port }),
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
