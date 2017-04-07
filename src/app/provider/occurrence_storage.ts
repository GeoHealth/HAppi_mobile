import { Injectable, Optional } from "@angular/core";
import { Occurrence } from "../../models/occurrence";
import { CachedArray } from "./cached_array";
import { Crashlytics } from "../services/crashlytics";
import { Observable } from "rxjs";

declare let require: any;
let loki = require('lokijs');
let localForage = require('localforage');

@Injectable()
export class OccurrenceStorage {
  private inMemoryDB: any;
  store: any;
  private occurrences: any;
  private cache_occurrences: CachedArray<Occurrence>;

  constructor(private crashlytics: Crashlytics, @Optional() callback?: (success: Boolean) => void) {
    this.initStore();
    this.initInMemoryDB();
    this.cache_occurrences = new CachedArray<Occurrence>();
    this.importAll().subscribe(callback);
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

  private importAll(): Observable<boolean> {
    let self = this;
    return Observable.create((observer) => {
      this.store.getItem('occurrences').then((value) => {
        self.inMemoryDB.loadJSON(value);
        self.occurrences = self.inMemoryDB.getCollection('occurrences');        // slight hack! we're manually reconnecting the collection variable :-)
        this.cache_occurrences.invalidateCache();
        observer.next(true);
        observer.complete();
      }).catch((err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error importing database: ' + err);
        observer.next(false);
        observer.complete();
      });
    });
  };

  private saveAll(): Observable<boolean> {
    return Observable.create((observer) => {
      this.store.setItem('occurrences', JSON.stringify(this.inMemoryDB)).then((value) => {
        this.cache_occurrences.invalidateCache();
        observer.next(true);
        observer.complete();
      }).catch((err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation('error saving database: ' + err);
        observer.next(false);
        observer.complete();
      });
    });
  };

  /**
   * Add the given occurrence to the database
   */
  add(occurrence: Occurrence): Observable<boolean> {
    if (occurrence instanceof Occurrence) {
      this.occurrences.insert(occurrence);
      return this.saveAll();
    } else {
      throw new TypeError("Wrong type adding to occurrences_storage");
    }
  };

  /**
   * Add the given occurencces to the database
   */
  addAll(occurrences: Array<Occurrence>): Observable<boolean> {
    occurrences.forEach((occurrence) => {
      if (occurrence instanceof Occurrence) {
        this.occurrences.insert(occurrence);
      } else {
        throw new TypeError("Wrong type adding to occurrences_storage");
      }
    });
    return this.saveAll();
  }

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
    return Occurrence.convertObjectToInstance(this.occurrences.find({occurrence_id: searchId})[0]);
  };

  all(): Occurrence[] {
    return this.cache_occurrences.getCache((): Occurrence[] => {
      return Occurrence.convertObjectsToInstancesArray(this.occurrences.data);
    });
  }

  removeAll(): Observable<boolean> {
    this.occurrences.clear();
    return this.saveAll();
  }

  remove(occurrence: Occurrence): Observable<boolean> {
    let o = this.occurrences.find({'id': occurrence.id});
    this.occurrences.remove(o);
    return this.saveAll();
  }
}
