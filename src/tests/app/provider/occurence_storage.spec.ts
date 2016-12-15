import {} from 'jasmine';
import { OccurrenceStorage }          from '../../../app/provider/occurrence_storage';
import {Symptom} from '../../../models/symptom';
import {Occurrence} from '../../../models/occurrence';
import {DateProvider} from "../../../app/provider/date_provider";

describe('Occurrence storage', () => {
  let occurrenceStorage: OccurrenceStorage;
  let keyValueStore = {};

  beforeEach(() => {
    occurrenceStorage = new OccurrenceStorage();

    spyOn(occurrenceStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(occurrenceStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(occurrenceStorage.store, 'clear').and.callFake(() => {
      keyValueStore = {};
    });
  });

  function buildSymptom1(): Symptom{
    return new Symptom("Abdominal Pain");
  }

  function buildSymptom2(): Symptom{
    return new Symptom("Abnormal Facial Expressions");
  }

  function buildOccurrence1(): Occurrence{
    return new Occurrence(buildSymptom1(), DateProvider.getCurrentISODateAsString(), null, null);
  }

  function buildOccurrence2(): Occurrence{
    return new Occurrence(buildSymptom2(), DateProvider.getCurrentISODateAsString(), null, null);
  }

  let addOccurrence = (newOccurrence) => {
    occurrenceStorage.add(newOccurrence);
  };

  let addFewOccurrence = () => {
    addOccurrence(buildOccurrence1());
    addOccurrence(buildOccurrence2());
  };

  it('should start with an empty database', () => {
    expect(occurrenceStorage.size()).toEqual(0);
  });

  it('should store an occurrence correctly', () => {
    addOccurrence(buildOccurrence1());
    expect(occurrenceStorage.size()).toEqual(1);
  });

  it('should read an occurrence correctly', () => {
    let occurrence1: Occurrence = buildOccurrence1();
    addOccurrence(occurrence1);
    let occurrence: Occurrence = occurrenceStorage.findById(occurrence1.id);
    expect(occurrence.id).toEqual(occurrence1.id);
    expect(occurrence.symptom.name).toEqual(occurrence1.symptom.name);
  });

  it('should read all symptoms', () => {
    let occurrence1: Occurrence = buildOccurrence1();
    let occurernce2: Occurrence = buildOccurrence2();
    addFewOccurrence();
    let occurrences = occurrenceStorage.all();
    expect(occurrences.length).toEqual(2);
    expect(occurrences[0].symptom.name).toEqual(occurrence1.symptom.name);
    expect(occurrences[1].symptom.name).toEqual(occurernce2.symptom.name);
  });
});
