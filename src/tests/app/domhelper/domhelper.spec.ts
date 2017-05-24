import {DOMHelper} from "../../../app/domhelper/domhelper";

describe('DOMHelper', () => {
  describe('.disableElementById', () => {
    beforeEach(() => {
      this.dummyElement = document.createElement('div');
      this.id = 'uniqueIDForDOMHelperSpec';
      this.dummyElement.id = this.id;
      spyOn(document, "getElementById").and.returnValue(this.dummyElement);
    });

    it('disable the element', () => {
      expect(this.dummyElement.disabled).toBeFalsy();
      DOMHelper.disableElementById(this.id);
      expect(this.dummyElement.disabled).toBeTruthy();
    });
  });
});
