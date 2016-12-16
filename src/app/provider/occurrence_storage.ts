import {Injectable} from '@angular/core';
import {Occurrence} from '../../models/occurrence';

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class OccurrenceStorage {
  private inMemoryDB: any;
  store: any;
  private occurrences: any;

  constructor() {
    this.initStore();
    this.initInMemoryDB();
    this.importAll();
  };

  private initStore() {
    this.store = localForage.createInstance({
      name: 'symptom occurrence happi'
    });
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  };

  private initInMemoryDB() {
    this.inMemoryDB = new loki('occurrences');
    this.occurrences = this.inMemoryDB.addCollection('occurrences');
  };

  private importAll() {
    let self = this;
    this.store.getItem('occurrences').then((value) => {
      console.log('the full occurrences database has been retrieved');
      self.inMemoryDB.loadJSON(value);
      self.occurrences = self.inMemoryDB.getCollection('occurrences');        // slight hack! we're manually reconnecting the collection variable :-)
    }).catch((err) => {
      console.log('error importing database: ' + err);
    });
  };

  private saveAll() {
    this.store.setItem('occurrences', JSON.stringify(this.inMemoryDB)).then((value) => {
      console.log('database occurrences successfully saved');
    }).catch((err) => {
      console.log('error while saving: ' + err);
    });
  };

  /**
   * Add the given occurrence to the database
   */
  add(occurrence: Occurrence) {
    if (occurrence instanceof Occurrence) {
      this.occurrences.insert(occurrence);
      this.saveAll();
    } else {
      throw new TypeError("Wrong type adding to occurrences_storage");
    }
  };

  /**
   * Returns the number of occurrences storred in the database
   */
  size(): number {
    return this.occurrences.count();
  };

  /**
   * Find and return the occurrence matching the given id
   */
  findById(searchId): Occurrence {
    return this.occurrences.find({occurrence_id: searchId})[0];
  };

  all(): Occurrence[] {
    return this.occurrences.data as Occurrence[];
  }

}
