import localForage from "localforage";

declare var require: any;

var loki = require('lokijs');
var store = localForage.createInstance({
  name: 'symptom happi'
})
store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);


export class SymptomsStorage {
  db: any;
  symptoms: any;

  constructor() {
    this.db = new loki('symptoms');
    this.symptoms = this.db.addCollection('symptoms');
    this.importAll();
  }

  add(symptom) {
    this.symptoms.insert(symptom);
    this.saveAll();
  }

  saveAll() {
    store.setItem('storeKey', JSON.stringify(this.db)).then(function (value) {
      console.log('database successfully saved');
    }).catch(function(err) {
      console.log('error while saving: ' + err);
    });
  }

  importAll() {
    var self = this;
    store.getItem('storeKey').then(function(value) {
      console.log('the full database has been retrieved');
      self.db.loadJSON(value);
      self.symptoms = self.db.getCollection('symptoms');        // slight hack! we're manually reconnecting the collection variable :-)
    }).catch(function(err) {
      console.log('error importing database: ' + err);
    });
  }


}
