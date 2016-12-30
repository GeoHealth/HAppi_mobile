import {TranslationProvider} from "../../../app/provider/translation_provider";
import {PlatformMock} from "../../mocks";
import {Platform} from "ionic-angular";
import {Globalization} from "ionic-native";

describe('TranslationProvider', () => {
  let translation_provider: TranslationProvider;
  let locale = 'fr-BE';

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
    it('returns "loading..." if the translator is null or undefined', () => {
      expect(translation_provider.gettext('any')).toEqual(TranslationProvider.loadingText);
    });
  });

  xdescribe('#loadJSONLocale', () => {

  });

  xdescribe('#getTranslationFilePath', () => {

  });
});
