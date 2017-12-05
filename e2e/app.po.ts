import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  getParagraphText() {
    return element(by.css('nmd-app h1')).getText()
  }
}
