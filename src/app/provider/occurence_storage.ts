import {Injectable} from '@angular/core'
import {Symptom} from '../../models/symptom'
import {Occurence} from '../../models/occurence'

declare var require: any;
var loki = require('lokijs');
var localForage = require('localforage');

@Injectable()
export class OccurenceStorage {
  private inMemoryDB: any;
  store: any;
  private occurences: any;

  constructor() {
    this.initStore();
    this.initInMemoryDB();
    this.importAll();
  };

  private initStore(){
    this.store = localForage.createInstance({
      name: 'symptom occurence happi'
    })
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  };

  private initInMemoryDB(){
    this.inMemoryDB = new loki('occurences');
    this.occurences = this.inMemoryDB.addCollection('occurences');
  };

  private importAll() {
    var self = this;
    this.store.getItem('occurences').then(function(value) {
      console.log('the full occurences database has been retrieved');
      self.inMemoryDB.loadJSON(value);
      self.occurences = self.inMemoryDB.getCollection('occurences');        // slight hack! we're manually reconnecting the collection variable :-)
    }).catch(function(err) {
      console.log('error importing database: ' + err);
    });
  };

  private saveAll() {
    this.store.setItem('occurences', JSON.stringify(this.inMemoryDB)).then(function (value) {
      console.log('database occurences successfully saved');
    }).catch(function(err) {
      console.log('error while saving: ' + err);
    });
  };

  /**
   * Add the given occurence to the database
   */
  add(occurence: Occurence) {
    if (occurence instanceof Occurence) {
      this.occurences.insert(occurence);
      this.saveAll();
    } else {
      throw new TypeError("Wrong type adding to occurences_storage");
    }
  };

  /**
   *
   * Returns the number of occurences storred in the database
   *
   **/
  size(): number {
    return this.occurences.count();
  };

  /**
   * Find and return the occurence matching the given id
   */
  findById(searchId): Occurence {
    return this.occurences.find({occurence_id: searchId})[0];
  };

}
