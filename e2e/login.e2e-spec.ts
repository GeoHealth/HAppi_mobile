import { browser } from 'protractor';
import { LoginPageObject } from './page-objects/login.page-objects';

let loginPageObject: LoginPageObject = new LoginPageObject();

describe('Login E2E Test', () => {

  beforeEach(() => {
    loginPageObject.browseToPage();
  });

  it('starts with an empty form and the login button is disabled', () => {
    expect(loginPageObject.getEmailValue()).toEqual('');
    expect(loginPageObject.getPasswordValue()).toEqual('');
    expect(loginPageObject.getLoginButton().isEnabled()).toBeFalsy();
  });

  it('changes fields when the user insert data', () => {
    loginPageObject.setEmailValue('nala@mail.com');
    loginPageObject.setPasswordValue('azerty123');
    browser.driver.sleep(2000);
    loginPageObject.getLoginButton().click();
    browser.driver.sleep(2000);
    expect(loginPageObject.getTitlePage()).toEqual('Home');
    loginPageObject.logOut();
  });
});
