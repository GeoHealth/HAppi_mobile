declare var require: any;
var loki = require('lokijs');
var localForage = require('localforage');

export class SymptomsStorage {
  private inMemoryDB: any;
  private store: any;
  symptoms: any;

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

  add(symptom) {
    this.symptoms.insert(symptom);
    this.saveAll();
  }

  saveAll() {
    this.store.setItem('storeKey', JSON.stringify(this.inMemoryDB)).then(function (value) {
      console.log('database successfully saved');
    }).catch(function(err) {
      console.log('error while saving: ' + err);
    });
  }

  importAll() {
    var self = this;
    this.store.getItem('storeKey').then(function(value) {
      console.log('the full database has been retrieved');
      self.inMemoryDB.loadJSON(value);
      self.symptoms = self.inMemoryDB.getCollection('symptoms');        // slight hack! we're manually reconnecting the collection variable :-)
    }).catch(function(err) {
      console.log('error importing database: ' + err);
    });
  }


}
