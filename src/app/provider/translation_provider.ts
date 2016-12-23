import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
declare let Gettext: any;

@Injectable()
export class TranslationProvider {
  private gt: any;
  private locale_to_file = {
    "en": "en.po",
    "fr_BE": "fr_BE.po"
  };
  private current_locale: string;
  private json_locale_data: any;

  constructor(private http: Http) {
    debugger;
    this.loadCurrentLocale();
    this.loadJSONLocale();
    let params = {
      "domain": "happi_mobile",
      "locale_data": this.json_locale_data
    };
    this.gt = new Gettext(params);
  }

  private loadCurrentLocale() {
    this.current_locale = "en"; //TODO get it dynamically
  }

  gettext(msgid) {
    return this.gt.gettext(msgid);
  }

  private loadJSONLocale() {
    let translationFilePath = this.getTranslationFilePath();
    this.json_locale_data = this.http.get(translationFilePath)
      .map((res) => {
        debugger;
        this.json_locale_data = res;
      })
      .catch((error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
      });
  }

  private getTranslationFilePath() {
    return 'assets/locales' + this.locale_to_file[this.current_locale];
  }
}
