import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { Crashlytics } from "../services/crashlytics";
import { Observable } from "rxjs";
import { User } from "./auth_service";

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class AuthStorage {

  private inMemoryDBHeaders: any;
  private inMemoryDBUser: any;
  store: any;
  private headers: any;
  private user: any;

  constructor(private crashlytics: Crashlytics) {
    this.initStore();
    this.initinMemoryDBHeaders();
    this.initInMemoryDBUser();
  }

  private initStore() {
    this.store = localForage.createInstance({
      name: 'auth happi'
    });
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  }

  private initinMemoryDBHeaders() {
    this.inMemoryDBHeaders = new loki('headers');
    this.headers = this.inMemoryDBHeaders.addCollection('headers');
  };

  private initInMemoryDBUser() {
    this.inMemoryDBUser = new loki('user');
    this.user = this.inMemoryDBUser.addCollection('user');
  };

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      let self = this;
      this.store.getItem('user').then((value) => {
        self.inMemoryDBUser.loadJSON(value);
        self.user = self.inMemoryDBUser.getCollection('user');
        resolve(self.user);
      }).catch((err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error importing database: ' + err);
        resolve(null);
      });
    });
  }

  /**
   * Read the headers stored in the DB asynchronously.
   * @returns {Promise<Headers>} This promise is resolved when the headers are read. The resolved value is the readed headers.
   */
  getHeaders(): Promise<Headers> {
    return new Promise((resolve, reject) => {
      let self = this;
      this.store.getItem('headers').then((value) => {
        self.inMemoryDBHeaders.loadJSON(value);
        self.headers = self.inMemoryDBHeaders.getCollection('headers');
        resolve(self.headers);
      }).catch((err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error importing database: ' + err);
        resolve(null);
      });
    });
  }

  saveUser(user: User): Observable<boolean> {
    return Observable.create((observer) => {
      this.user.clear();
      if (user instanceof User) {
        this.user.insert(user);
        this.store.setItem('user', JSON.stringify(this.inMemoryDBUser)).then((value) => {
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
    })
  }

  saveHeaders(headers: Headers): Observable<boolean> {
    return Observable.create((observer) => {
      this.headers.clear();
      if (headers instanceof Headers) {
        this.headers.insert(headers);
        this.store.setItem('headers', JSON.stringify(this.inMemoryDBHeaders)).then((value) => {
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

  deleteUser(): Observable<boolean> {
    return this.saveUser(new User(" ", " ", " ", " "));
  }

  deleteHeaders(): Observable<boolean> {
    return this.saveHeaders(new Headers());
  }
}
