import { browser, by, element, ElementFinder } from 'protractor';
import { PageObject } from "./page-object";
import { LoginPageObject } from "./login.page-objects";

export class RegisterPageObject extends PageObject {
  loginPage: LoginPageObject = new LoginPageObject();

  browseToPage(): void {
    this.loginPage.browseToPage();
    browser.driver.sleep(2000);
    this.loginPage.getRegisterButton().click();
    browser.driver.sleep(2000);
  }

  getFirstNameValue() {
    return element(by.name('first_name')).getText();
  }

  getLastNameValue() {
    return element(by.name('last_name')).getText();
  }

  getGenderNameValue() {
    return element(by.name('gender')).getText();
  }

  getEmailValue() {
    return element(by.name('email')).getText();
  }

  getPasswordValue() {
    return element(by.name('password')).getText();
  }

  getPasswordConfirmationValue() {
    return element(by.name('password_confirmation')).getText();
  }

  isAgreementWithTermChecked() {
    return element(by.name('condition')).getText();
  }

  getRegisterButton(): ElementFinder {
    return element(by.css(".submit-btn"));
  }
}
