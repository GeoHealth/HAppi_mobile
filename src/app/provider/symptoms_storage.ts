import {Symptom} from '../../models/symptom'
import {Injectable} from '@angular/core'

declare var require: any;
var loki = require('lokijs');
var localForage = require('localforage');

@Injectable()
export class SymptomsStorage {
  private inMemoryDB: any;
  store: any;
  private symptoms: any;

  constructor() {
    this.initStore();
    this.initInMemoryDB();
    this.importAll();
  }

  private initStore(){
    this.store = localForage.createInstance({
      name: 'symptom happi'
    })
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  }

  private initInMemoryDB(){
    this.inMemoryDB = new loki('symptoms');
    this.symptoms = this.inMemoryDB.addCollection('symptoms');
  }

  private importAll() {
    var self = this;
    this.store.getItem('storeKey').then(function(value) {
      console.log('the full database has been retrieved');
      self.inMemoryDB.loadJSON(value);
      self.symptoms = self.inMemoryDB.getCollection('symptoms');        // slight hack! we're manually reconnecting the collection variable :-)
    }).catch(function(err) {
      console.log('error importing database: ' + err);
    });
  }

  private saveAll() {
    this.store.setItem('storeKey', JSON.stringify(this.inMemoryDB)).then(function (value) {
      console.log('database successfully saved');
    }).catch(function(err) {
      console.log('error while saving: ' + err);
    });
  }

  add(symptom : Symptom) {
    if (symptom instanceof Symptom) {
      this.symptoms.insert(symptom);
      this.saveAll();
    } else {
      throw new TypeError("Wrong type adding to symptoms_storage");
    }
  }

  all(): Symptom[] {
    return this.symptoms.data as Symptom[];
  }

  /**
   *
   * Returns the number of symptoms storred in the database
   *
   **/
  size() : number {
    return this.symptoms.count();
  }

  /**
   *
   * Returns all symptoms with the name
   *
   **/
  findByName(name: string) : Symptom[] {
    return this.symptoms.find({name: name}) as Symptom[];
  }


}
