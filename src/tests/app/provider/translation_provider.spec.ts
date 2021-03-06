import { TranslationProvider } from "../../../app/provider/translation_provider";
import { PlatformMock, CrashlyticsMock } from "../../mocks";
import { Platform } from "ionic-angular";
import { Globalization } from "ionic-native";

describe('TranslationProvider', () => {
  beforeAll(() => {
    let spy = spyOn(TranslationProvider.prototype, 'loadDevicePreferredLocale').and.stub();
    this.translation_provider = new TranslationProvider(new PlatformMock() as Platform, new CrashlyticsMock() as any);
    spy.and.callThrough();
  });

  afterAll(() => {
    this.translation_provider = null;
  });

  beforeEach(() => {
    this.locale = 'fr-BE';
  });

  afterEach(() => {
    this.locale = null;
  });

  describe('#current_locale', () => {
    beforeEach(() => {
      this.locale = 'locale';
      spyOn(this.translation_provider, 'loadJSONLocale').and.stub();
    });

    it('sets current_locale to the given value', () => {
      this.translation_provider.current_locale = this.locale;
      expect(this.translation_provider.current_locale).toEqual(this.locale);
    });

    it('calls loadJSONLocale', () => {
      this.translation_provider.current_locale = this.locale;
      expect(this.translation_provider.loadJSONLocale).toHaveBeenCalled();
    });

    it('sets current_locale to the default language if the given value is null', () => {
      this.translation_provider.current_locale = null;
      expect(this.translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
    });

    it('sets current_locale to the default language if the given value is undefined', () => {
      this.translation_provider.current_locale = undefined;
      expect(this.translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
    });
  });

  describe('#loadDevicePreferredLocale', () => {
    beforeEach(() => {
      this.getPreferredLanguagePromise = null;
      spyOn(Globalization, 'getPreferredLanguage').and.callFake(() => {
        return this.getPreferredLanguagePromise;
      });
      spyOn(this.translation_provider, 'loadJSONLocale').and.stub();
    });

    afterEach(() => {
      this.getPreferredLanguagePromise = null;
    });

    it('set the value of the current_locale to the language of the device', (done) => {
      this.getPreferredLanguagePromise = new Promise((resolve, reject) => {
        resolve({"value": this.locale});
      });

      this.translation_provider.loadDevicePreferredLocale().then(() => {
        expect(Globalization.getPreferredLanguage).toHaveBeenCalled();
        expect(this.translation_provider.current_locale).toEqual(this.locale);
        done();
      }).catch(() => {
        fail();
      });
    });

    it('set the value of current_locale to the default locale when it cannot be retrieved from the device', (done) => {
      this.getPreferredLanguagePromise = new Promise((resolve, reject) => {
        reject({});
      });

      this.translation_provider.loadDevicePreferredLocale().then(() => {
        expect(Globalization.getPreferredLanguage).toHaveBeenCalled();
        expect(this.translation_provider.current_locale).toEqual(TranslationProvider.default_locale);
        done();
      }).catch(() => {
        fail();
      });
    });
  });

  describe('#gettext', () => {
    it('returns "loading..." if the translator is null or undefined', () => {
      expect(this.translation_provider.gettext('any')).toEqual(TranslationProvider.loadingText);
    });
  });

  xdescribe('#loadJSONLocale', () => {

  });

  xdescribe('#getTranslationFilePath', () => {

  });
});


