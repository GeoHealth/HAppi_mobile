import {Injectable} from "@angular/core";
import {Crashlytics} from "./app/services/crashlytics";
import {IonicErrorHandler} from 'ionic-angular';
import * as stacktrace from 'stacktrace-js';

@Injectable()
export class FabricErrorHandler extends IonicErrorHandler {
  constructor(public analytics: Crashlytics) {
    super();
  }

  handleError(error) {
    stacktrace.get().then(
      (trace) => this.analytics.sendNonFatalCrash(error.message, trace)
    );

    super.handleError(error);
  }
}
