import {Injectable} from '@angular/core';
import {Headers} from "@angular/http";

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class AuthStorage {

    private inMemoryDB: any;
    store: any;
    private headers: any;

    constructor() {
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
  get(): Promise<Headers> {
        return new Promise((resolve, reject) => {
          let self = this;
          this.store.getItem('headers').then((value) => {
            self.inMemoryDB.loadJSON(value);
            self.headers = self.inMemoryDB.getCollection('headers');
            resolve(self.headers);
          }).catch((err) => {
            (<any>window).fabric.Crashlytics.sendNonFatalCrash('error importing database: ' + err);
          });
        });
    }

    save(headers: Headers) {
        this.headers.clear();
        if (headers instanceof Headers) {
            this.headers.insert(headers);
            this.store.setItem('headers', JSON.stringify(this.inMemoryDB)).then((value) => {

            }).catch((err) => {
              (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
            });
        } else {
            throw new TypeError("Wrong type adding to header storage");
        }
    }

    delete() {
      this.save(new Headers());
    }
}
