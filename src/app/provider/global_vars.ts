import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {

  public title: any;

  constructor() {
    this.title = "HAppi";
  }

  setTitle(value) {
    this.title = value;
  }

  getTitle() {
    return this.title;
  }

}
