import { browser, element, by, ElementFinder, protractor, $ } from 'protractor';
import { PageObject } from "./page-object";

export class LoginPageObject extends PageObject {
  browseToPage(): void{
    browser.get('');
    let EC = protractor.ExpectedConditions;
    browser.wait( EC.invisibilityOf( $('.loading-md') ), 15000 );
  }

  logOut() {
    let menuButton = element(by.css('#main-menu'));
    menuButton.click();
    browser.driver.sleep(2000);
    let disconnectionButton = element(by.css('#disconnection'));
    disconnectionButton.click();
    browser.driver.sleep(2000);
  }

  getRegisterButton(): ElementFinder {
    return element(by.css('.register-btn'));
  }

  getLoginButton(): ElementFinder {
    return element(by.css('#login'));
  }

  getEmailValue() {
    return element(by.css('#login-name > input')).getText();
  }

  getPasswordValue() {
    return element(by.css('#login-password')).getText();
  }

  setEmailValue(email) {
    element(by.css('#login-name > input')).sendKeys(email);
  }

  setPasswordValue(password: string) {
    element(by.css('#login-password > input')).sendKeys(password);
  }

  getTitlePage() {
    return element(by.css('#title-page')).getText();
  }
}
