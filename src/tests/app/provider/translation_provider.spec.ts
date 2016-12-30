import {TranslationProvider} from "../../../app/provider/translation_provider";
import {PlatformMock} from "../../mocks";
import {Platform} from "ionic-angular";
import {Globalization} from "ionic-native";

declare let Gettext: any;

describe('TranslationProvider', () => {
  let translation_provider: TranslationProvider;
  let locale = 'fr-BE';
  let json_translation_mock = {
    "": {
      "project-id-version": "happi_mobile",
      "pot-creation-date": "2016-12-24 00:15+0100",
      "po-revision-date": "2016-12-24 00:15+0100",
      "last-translator": "",
      "language-team": "Geohealth Crew <geohealth.info@gmail.com>",
      "language": "en",
      "mime-version": "1.0",
      "content-type": "text/plain; charset=UTF-8",
      "content-transfer-encoding": "8bit",
      "x-generator": "Poedit 1.8.11",
      "x-poedit-basepath": "../../../src",
      "plural-forms": "nplurals=2; plural=(n != 1);",
      "x-poedit-sourcecharset": "UTF-8",
      "x-poedit-keywordslist": "traduction.gettext;_.gettext;gettext;__.gettext",
      "x-poedit-searchpath-0": ".",
      "x-poedit-searchpathexcluded-0": "tests",
      "x-poedit-searchpathexcluded-1": "assets"
    },
    "any": [
      null,
      "any"
    ],
    "test string": [
      null,
      "another test"
    ]
  };

  beforeEach(() => {
    translation_provider = new TranslationProvider(new PlatformMock() as Platform);
  });

  describe('#current_locale', () => {
    let locale = 'locale';

    beforeEach(() => {
      spyOn(translation_provider, 'loadJSONLocale');
    });

    it('sets current_locale to the given value', () => {
      translation_provider.current_locale = locale;
      expect(translation_provider.current_locale).toEqual(locale);
    });

    it('calls loadJSONLocale', () => {
      translation_provider.current_locale = locale;
      expect(translation_provider.loadJSONLocale).toHaveBeenCalled();
    });

    it('sets current_locale to the default language if the given value is null', () => {
      translation_provider.current_locale = null;
      expect(translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
    });

    it('sets current_locale to the default language if the given value is undefined', () => {
      translation_provider.current_locale = undefined;
      expect(translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
    });
  });

  describe('#loadDevicePreferredLocale', () => {
    let getPreferredLanguagePromise: any;

    beforeEach(() => {
      spyOn(Globalization, 'getPreferredLanguage').and.callFake(() => {
        return getPreferredLanguagePromise;
      });
    });

    it('set the value of the current_locale to the language of the device', (done) => {
      getPreferredLanguagePromise = new Promise((resolve, reject) => {
        resolve({"value": locale});
      });

      translation_provider.loadDevicePreferredLocale().then(() => {
        expect(Globalization.getPreferredLanguage).toHaveBeenCalled();
        expect(translation_provider.current_locale).toEqual(locale);
        done();
      });

    });

    it('set the value of current_locale to the default locale when it cannot be retrieved from the device', (done) => {
      getPreferredLanguagePromise = new Promise((resolve, reject) => {
        reject({});
      });

      translation_provider.loadDevicePreferredLocale().then(() => {
        expect(Globalization.getPreferredLanguage).toHaveBeenCalled();
        expect(translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
        done();
      });
    });
  });

  describe('#gettext', () => {
    xit('returns the translation', () => { // Gettext is not defined in this context
      spyOn(translation_provider, 'loadJSONLocale').and.callFake(() => {
        let params = {
          "domain": TranslationProvider.domain,
          "locale_data": {"happi_mobile": json_translation_mock}
        };
        translation_provider.gt = new Gettext(params);
      });
      translation_provider.loadJSONLocale();

      expect(translation_provider.gettext("test string")).toEqual("another test");
    });

    it('returns "loading..." if the translator is null or undefined', () => {
      expect(translation_provider.gettext('any')).toEqual(TranslationProvider.loadingText);
    });
  });

  xdescribe('#loadJSONLocale', () => {

  });

  xdescribe('#getTranslationFilePath', () => {

  });
});
