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


    get(): Headers {
        return this.headers;
    }

    save(headers: Headers) {
        console.log(headers);
        if (headers instanceof Headers) {
            this.headers.insert(headers);
            this.store.setItem('headers', JSON.stringify(this.inMemoryDB)).then((value) => {

            }).catch((err) => {

            });
        } else {
            throw new TypeError("Wrong type adding to header storage");
        }
    };
}