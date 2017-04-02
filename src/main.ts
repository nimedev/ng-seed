/**
 * Main module used to bootstrap de application
 * @module index
 */
/// <reference path="./typings/index.d.ts" />

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

// Global styles
import './styles'

// Assets to bundle with webpack
import './favicon.ico'
import './robots.txt'

// App module
import { AppModule } from './app/app.module'
import appConfig from './app-config'

// Enable production mode
if (appConfig.ENV === 'production') {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
