import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getComponentTitleText() {
    return element(by.css('app-average-loan .title')).getText();
  }
}
