import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
import {Globalization} from 'ionic-native';
import {Platform} from "ionic-angular";

declare let Gettext: any;

/**
 * A module used to provide translations.
 * It uses the device's preferred language by default.
 * It is based on the https://sourceforge.net/projects/jsgettext.berlios/ library
 */
@Injectable()
export class TranslationProvider {
  private gt: any;
  private locale_to_file = {
    "en-US": "en.json",
    "fr-BE": "fr_BE.json",
    "fr-FR": "fr_BE.json"
  };
  private _current_locale: string;
  private json_locale_data: any;
  static domain: string = "happi_mobile";
  static default_locale: string = "en-US";

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      this.loadDevicePreferredLocale();
    });
  }

  /**
   * Set the current locale and refresh the translation module.
   * If the given value is null or undefined, the default_locale will be used.
   * @param value the new locale.
   */
  set current_locale(value: string) {
    if (isNullOrUndefined(value)) {
      this._current_locale = TranslationProvider.default_locale;
    } else {
      this._current_locale = value;
    }
    this.loadJSONLocale();
  }

  /**
   * Set the locale to the device's preferred language.
   */
  public loadDevicePreferredLocale() {
    Globalization.getPreferredLanguage().then((locale) => {
      this.current_locale = locale.value;
    }).catch((err) => {
      console.error(err);
      this.current_locale = null;
    });

  }

  /**
   * Retrieve the translation of the given msgid.
   * Before the translation module is ready, it will return "loading...".
   * @param msgid a message id.
   * @returns {any} the string "loading..." if the module is not yet ready otherwise it returns the translation corresponding to the current_locale.
   */
  gettext(msgid) {
    if (isNullOrUndefined(this.gt)) {
      return "loading...";
    } else {
      return this.gt.gettext(msgid);
    }
  }

  /**
   * Load the JSON file containing the translation corresponding to the current_locale.
   */
  private loadJSONLocale() {
    let translationFilePath = this.getTranslationFilePath();

    let xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
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

  /**
   * Build the path to the translation file corresponding to the current_locale.
   * @returns {string}
   */
  private getTranslationFilePath() {
    return './assets/locales/' + this.locale_to_file[this._current_locale];
  }
}
