import { AppPage } from './app.po'

describe('yogh-webapp App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display welcome message', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('Hello Angular')
  })
})
