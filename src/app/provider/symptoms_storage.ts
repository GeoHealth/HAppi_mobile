import {Symptom} from '../../models/symptom';
import {Injectable} from '@angular/core';
import {SymptomWithFactor} from "../../models/symptom_with_factors";
import {CachedArray} from "./cached_array";
import {Crashlytics} from "../services/crashlytics";

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class SymptomsStorage {
  private inMemoryDB: any;
  store: any;
  private symptoms: any;
  private cache_symptoms: CachedArray<SymptomWithFactor>;

  constructor(private crashlytics: Crashlytics) {
    this.initStore();
    this.initInMemoryDB();
    this.importAll();
    this.cache_symptoms = new CachedArray<SymptomWithFactor>();
  }

  private initStore() {
    this.store = localForage.createInstance({
      name: 'symptom happi'
    });
    this.store.setDriver([localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]);
  }

  private initInMemoryDB() {
    this.inMemoryDB = new loki('symptoms');
    this.symptoms = this.inMemoryDB.addCollection('symptoms');
  }

  private importAll() {
    let self = this;
    this.store.getItem('storeKey').then((value) => {
      self.inMemoryDB.loadJSON(value);
      self.symptoms = self.inMemoryDB.getCollection('symptoms');        // slight hack! we're manually reconnecting the collection variable :-)
      this.cache_symptoms.invalidateCache();
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error importing database: ' + err);
    });
  }

  private saveAll() {
    this.store.setItem('storeKey', JSON.stringify(this.inMemoryDB)).then((value) => {
      this.cache_symptoms.invalidateCache();
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error while saving: ' + err);
    });
  }

  add(symptom: SymptomWithFactor) {
    if (symptom instanceof SymptomWithFactor) {
      this.symptoms.insert(symptom);
      this.saveAll();
    } else {
      throw new TypeError("Wrong type adding to symptoms_storage");
    }
  }

  all(): SymptomWithFactor[] {
    return this.cache_symptoms.getCache((): SymptomWithFactor[] => {
      return SymptomWithFactor.convertObjectsToInstancesArray(this.symptoms.data);
    });
  }

  /**
   *
   * Returns the number of symptoms stored in the database
   *
   **/
  size(): number {
    return this.symptoms.count();
  }

  /**
   *
   * Returns all symptoms with the name matching the given name
   *
   **/
  findByName(name: string): SymptomWithFactor[] {
    return SymptomWithFactor.convertObjectsToInstancesArray(this.symptoms.find({name: name}));
  }


  remove(symptom: Symptom) {
    let s = this.symptoms.find(symptom);
    this.symptoms.remove(s);
    this.saveAll();
  }
}
