import { Crashlytics } from "../../../app/services/crashlytics";
import { PlatformMock } from "../../mocks";
import { Platform } from "ionic-angular";
import * as stacktrace from "stacktrace-js";


describe('Crashlytics', () => {
  beforeAll(() => {
    this.crashlytics = new Crashlytics(new PlatformMock() as Platform);
  });

  afterAll(() => {
    this.crashlytics = null;
  });

  describe('#sendNonFatalCrashWithStacktraceCreation', () => {
    it('calls sendNonFatalCrash', (done) => {
      spyOn(this.crashlytics, 'sendNonFatalCrash').and.stub();
      spyOn(stacktrace, 'get').and.returnValue(new Promise((resolve, reject) => {
        resolve(null);
      }));
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation();
      setTimeout(
        () => {
          expect(this.crashlytics.sendNonFatalCrash).toHaveBeenCalled();
          done();
        },
        100);
    });
  });

  describe('when no handler is set', () => {
    beforeEach(() => {
      this.crashlytics['handler'] = undefined;
      spyOn(console, 'warn').and.stub();
    });

    describe('#setUserIdentifier', () => {
      beforeEach(() => {
        this.crashlytics.setUserIdentifier(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#setUserName', () => {
      beforeEach(() => {
        this.crashlytics.setUserName(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#setUserEmail', () => {
      beforeEach(() => {
        this.crashlytics.setUserEmail(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#addLog', () => {
      beforeEach(() => {
        this.crashlytics.addLog(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendNonFatalCrash', () => {
      beforeEach(() => {
        this.crashlytics.sendNonFatalCrash(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#setStringValueForKey', () => {
      beforeEach(() => {
        this.crashlytics.setStringValueForKey(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendSignUp', () => {
      beforeEach(() => {
        this.crashlytics.sendSignUp(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendLogin', () => {
      beforeEach(() => {
        this.crashlytics.sendLogin(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendCustomEvent', () => {
      beforeEach(() => {
        this.crashlytics.sendCustomEvent(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendStartCheckout', () => {
      beforeEach(() => {
        this.crashlytics.sendStartCheckout(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('#sendContentView', () => {
      beforeEach(() => {
        this.crashlytics.sendContentView(null);
      });

      it('calls console.warn', () => {
        expect(console.warn).toHaveBeenCalled();
      });
    });
  });

  describe('when a handler is set', () => {
    beforeEach(() => {
      this.handler = {
        Crashlytics: {
          setUserIdentifier: (id) => {
          },
          setUserName: (name) => {
          },
          setUserEmail: (email) => {
          },
          addLog: (log) => {
          },
          sendNonFatalCrash: (msg, stacktrace) => {
          },
          setStringValueForKey: (key, value) => {
          },

        },
        Answers: {
          sendSignUp: (type, success, attributes) => {
          },
          sendLogIn: (type, success, attributes) => {
          },
          sendCustomEvent: (name, attr) => {
          },
          sendStartCheckout: (totalPrice, currency, itemCount, attributes) => {
          },
          sendContentView: (name, type, id, attributes) => {
          }
        }
      };
      this.crashlytics['handler'] = this.handler;
    });

    afterEach(() => {
      this.handler = null;
    });

    describe('#setUserIdentifier', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'setUserIdentifier').and.stub();
        this.crashlytics.setUserIdentifier(null);
      });

      it('calls this.handler.Crashlytics.setUserIdentifier', () => {
        expect(this.handler.Crashlytics.setUserIdentifier).toHaveBeenCalled();
      });
    });

    describe('#setUserName', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'setUserName').and.stub();
        this.crashlytics.setUserName(null);
      });

      it('calls this.handler.Crashlytics.setUserName', () => {
        expect(this.handler.Crashlytics.setUserName).toHaveBeenCalled();
      });
    });

    describe('#setUserEmail', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'setUserEmail').and.stub();
        this.crashlytics.setUserEmail(null);
      });

      it('calls this.handler.Crashlytics.setUserEmail', () => {
        expect(this.handler.Crashlytics.setUserEmail).toHaveBeenCalled();
      });
    });

    describe('#addLog', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'addLog').and.stub();
        this.crashlytics.addLog(null);
      });

      it('calls this.handler.Crashlytics.addLog', () => {
        expect(this.handler.Crashlytics.addLog).toHaveBeenCalled();
      });
    });

    describe('#sendNonFatalCrash', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'sendNonFatalCrash').and.stub();
        this.crashlytics.sendNonFatalCrash(null);
      });

      it('calls this.handler.Crashlytics.sendNonFatalCrash', () => {
        expect(this.handler.Crashlytics.sendNonFatalCrash).toHaveBeenCalled();
      });
    });

    describe('#setStringValueForKey', () => {
      beforeEach(() => {
        spyOn(this.handler.Crashlytics, 'setStringValueForKey').and.stub();
        this.crashlytics.setStringValueForKey(null);
      });

      it('calls this.handler.Crashlytics.setStringValueForKey', () => {
        expect(this.handler.Crashlytics.setStringValueForKey).toHaveBeenCalled();
      });
    });

    describe('#sendSignUp', () => {
      beforeEach(() => {
        spyOn(this.handler.Answers, 'sendSignUp').and.stub();
        this.crashlytics.sendSignUp(null);
      });

      it('calls this.handler.Answers.sendSignUp', () => {
        expect(this.handler.Answers.sendSignUp).toHaveBeenCalled();
      });
    });

    describe('#sendLogIn', () => {
      beforeEach(() => {
        spyOn(this.handler.Answers, 'sendLogIn').and.stub();
        this.crashlytics.sendLogin(null);
      });

      it('calls this.handler.Answers.sendLogIn', () => {
        expect(this.handler.Answers.sendLogIn).toHaveBeenCalled();
      });
    });

    describe('#sendCustomEvent', () => {
      beforeEach(() => {
        spyOn(this.handler.Answers, 'sendCustomEvent').and.stub();
        this.crashlytics.sendCustomEvent(null);
      });

      it('calls this.handler.Answers.sendCustomEvent', () => {
        expect(this.handler.Answers.sendCustomEvent).toHaveBeenCalled();
      });
    });

    describe('#sendStartCheckout', () => {
      beforeEach(() => {
        spyOn(this.handler.Answers, 'sendStartCheckout').and.stub();
        this.crashlytics.sendStartCheckout(null);
      });

      it('calls this.handler.Answers.sendStartCheckout', () => {
        expect(this.handler.Answers.sendStartCheckout).toHaveBeenCalled();
      });
    });

    describe('#sendContentView', () => {
      beforeEach(() => {
        spyOn(this.handler.Answers, 'sendContentView').and.stub();
        this.crashlytics.sendContentView(null);
      });

      it('calls this.handler.Answers.sendContentView', () => {
        expect(this.handler.Answers.sendContentView).toHaveBeenCalled();
      });
    });
  });
});
