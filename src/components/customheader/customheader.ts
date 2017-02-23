import { Component,Input } from '@angular/core';
import {TranslationProvider} from "../../app/provider/translation_provider";

@Component({
  selector: 'custom-header',
  templateUrl: 'customheader.html'
})
export class CustomHeaderComponent {

  header_data: any;

  constructor(public translation: TranslationProvider) {}

  @Input()
  set header(header_data: any) {
    this.header_data=header_data;
  }

}
