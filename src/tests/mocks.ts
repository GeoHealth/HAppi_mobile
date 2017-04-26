// IONIC:
import { SymptomWithFactor } from "../models/symptom_with_factors";
import { Http } from "@angular/http";
import { Crashlytics } from "../app/services/crashlytics";
import { OccurrenceStorage } from "../app/provider/occurrence_storage";
import { ToastController } from "ionic-angular";

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise((resolve: Function): void => {
      resolve();
    });
  }

  public push(): any {
    return new Promise((resolve: Function): void => {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class NavParamsMock {
  private symptom_with_factor_mock: SymptomWithFactor = {
    id: "1",
    name: "name",
    short_description: "desc",
    long_description: "desc long",
    gender_filter: "male",
    category: null,
    factors: [
      {
        id: 1,
        name: "factor",
        type: "pain"
      }
    ]
  };

  public get(name): any {
    if (name === 'symptom') {
      return this.symptom_with_factor_mock;
    }
  };
}

export class HttpMock extends Http {
  constructor() {
    super(null, null);
  }

  public post(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public get(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class CrashlyticsMock extends Crashlytics {
  constructor() {
    super(new PlatformMock() as any);
  }

  public setUserIdentifier(id) {
    return;
  }

  public setUserName(name) {
    return;
  }

  public setUserEmail(email) {
    return;
  }

  public addLog(log) {
    return;
  }

  public sendNonFatalCrash(msg, stacktrace) {
    return;
  }

  public setStringValueForKey(key, value) {
    return;
  }

  public sendSignUp(type, success, attributes) {
    return;
  }

  public sendLogin(type, success, attributes) {
    return;
  }

  public sendCustomEvent(name, attr) {
    return;
  }

  public sendStartCheckout(totalPrice, currency, itemCount, attributes) {
    return;
  }

  public sendContentView(name, type, id, attributes) {
    return;
  }

  protected setup() {
    return;
  }
}

export class OccurrenceStorageMock extends OccurrenceStorage {
  constructor() {
    super(new CrashlyticsMock() as any);
  }
}

export class ToastControllerMock extends ToastController {
  constructor() {
    super(null);
  }
}
