import { RegisterPageObject } from "./page-objects/register.page-objects";

let registerPageObject: RegisterPageObject = new RegisterPageObject();

describe('Registration page E2E Test', () => {
  beforeEach(() => {
    registerPageObject.browseToPage();
  });

  it('starts with an empty form', () => {
    expect(registerPageObject.getFirstNameValue()).toEqual('');
    expect(registerPageObject.getLastNameValue()).toEqual('');
    expect(registerPageObject.getGenderNameValue()).toEqual('');
    expect(registerPageObject.getEmailValue()).toEqual('');
    expect(registerPageObject.getPasswordValue()).toEqual('');
    expect(registerPageObject.getPasswordConfirmationValue()).toEqual('');
    expect(registerPageObject.isAgreementWithTermChecked()).toBeFalsy();
  });

  it('disables the "register" button when the form is not valid', () => {
    expect(registerPageObject.getRegisterButton().isEnabled()).toBeFalsy();
  });
});
