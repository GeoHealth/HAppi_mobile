import { browser, element, by, ElementFinder, ElementHelper } from 'protractor';
import { PageObject } from "./page-object";

export class LoginPageObject extends PageObject {
  browseToPage(): void{
    browser.get('');
    browser.driver.sleep(500);
  }

  getRegisterButton(): ElementFinder {
    return element(by.css('.register-btn'));
  }
}
