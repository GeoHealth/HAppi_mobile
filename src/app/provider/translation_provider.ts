import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
declare let Gettext: any;

@Injectable()
export class TranslationProvider {
  private gt: any;
  private locale_to_file = {
    "en": "en.json",
    "fr_BE": "fr_BE.json"
  };
  private current_locale: string;
  private json_locale_data: any;
  static domain: string = "happi_mobile";

  constructor() {
    this.loadCurrentLocale();
    this.loadJSONLocale();
  }

  private loadCurrentLocale() {
    this.current_locale = "en";
  }

  gettext(msgid) {
    if(isNullOrUndefined(this.gt)){
      return "loading...";
    } else {
      return this.gt.gettext(msgid);
    }
  }

  private loadJSONLocale() {
    let translationFilePath = this.getTranslationFilePath();

    let xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        self.json_locale_data = {"happi_mobile": JSON.parse(this.responseText)};
        let params = {
          "domain": TranslationProvider.domain,
          "locale_data": self.json_locale_data
        };
        self.gt = new Gettext(params);
      }
    };
    xhttp.open("GET", translationFilePath, true);
    xhttp.send();
  }

  private getTranslationFilePath() {
    return './assets/locales/' + this.locale_to_file[this.current_locale];
  }
}
