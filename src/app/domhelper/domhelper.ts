export class DOMHelper {
  static  disableElementById(id: string): HTMLInputElement {
    let element = document.getElementById(id) as HTMLInputElement;
    element.disabled = true;
    return element;
  };
}
