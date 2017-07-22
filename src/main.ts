/**
 * Main module used to bootstrap de application
 * @module main
 */

// Global styles
import './styles'

import { enableProdMode } from '@angular/core'
import { platformBrowser } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

// App module
import { AppModule } from './app/app.module'
import { ENV } from './app.config'

// Enable production mode
if (ENV === 'production') {
  enableProdMode()
  platformBrowser().bootstrapModule(AppModule)
} else {
  platformBrowserDynamic().bootstrapModule(AppModule)
}
