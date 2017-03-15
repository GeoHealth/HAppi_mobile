import {Injectable} from "@angular/core";
import {Headers} from "@angular/http";
import {Crashlytics} from "../services/crashlytics";
import {Observable} from "rxjs";

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class AuthStorage {

  private inMemoryDB: any;
  store: any;
  private headers: any;

  constructor(private crashlytics: Crashlytics) {
    this.initStore();
    this.initInMemoryDB();
  }

  private initStore() {
    this.store = localForage.createInstance({
      name: 'auth happi'
    });
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  }

  private initInMemoryDB() {
    this.inMemoryDB = new loki('headers');
    this.headers = this.inMemoryDB.addCollection('headers');
  };

  /**
   * Read the headers stored in the DB asynchronously.
   * @returns {Promise<Headers>} This promise is resolved when the headers are read. The resolved value is the readed headers.
   */
  getHeaders(): Promise<Headers> {
    return new Promise((resolve, reject) => {
      let self = this;
      this.store.getItem('headers').then((value) => {
        self.inMemoryDB.loadJSON(value);
        self.headers = self.inMemoryDB.getCollection('headers');
        resolve(self.headers);
      }).catch((err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error importing database: ' + err);
        resolve(null);
      });
    });
  }

  saveHeaders(headers: Headers): Observable<boolean>  {
    return Observable.create((observer) => {
      this.headers.clear();
      if (headers instanceof Headers) {
        this.headers.insert(headers);
        this.store.setItem('headers', JSON.stringify(this.inMemoryDB)).then((value) => {
          observer.next(true);
          observer.complete();
        }).catch((err) => {
          this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
          observer.next(false);
          observer.complete();
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  deleteHeaders(): Observable<boolean>  {
    return this.saveHeaders(new Headers());
  }
}
