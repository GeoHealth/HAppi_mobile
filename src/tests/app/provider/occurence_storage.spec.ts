import {} from 'jasmine';
import { OccurrenceStorage }          from '../../../app/provider/occurence_storage';
import {Symptom} from '../../../models/symptom';
import {Occurence} from '../../../models/occurence';

describe('Occurence storage', () => {
  let occurenceStorage: OccurrenceStorage;
  let keyValueStore = {};

  beforeEach(() => {
    occurenceStorage = new OccurrenceStorage();

    spyOn(occurenceStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(occurenceStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(occurenceStorage.store, 'clear').and.callFake(() => {
      keyValueStore = {};
    });
  });

  function buildSymptom1(): Symptom{
    return new Symptom("Abdominal Pain");
  }

  function buildSymptom2(): Symptom{
    return new Symptom("Abnormal Facial Expressions");
  }

  function buildOccurence1(): Occurence{
    return new Occurence(buildSymptom1(), new Date().toISOString(), null);
  }

  function buildOccurence2(): Occurence{
    return new Occurence(buildSymptom2(), new Date().toISOString(), null);
  }

  let addOccurence = (newOccurence) => {
    occurenceStorage.add(newOccurence);
  };

  let addFewOccurence = () => {
    addOccurence(buildOccurence1());
    addOccurence(buildOccurence2());
  };

  it('should start with an empty database', () => {
    expect(occurenceStorage.size()).toEqual(0);
  });

  it('should store an occurence correclty', () => {
    addOccurence(buildOccurence1());
    expect(occurenceStorage.size()).toEqual(1);
  });

  it('should read an occurence correctly', () => {
    let occurence1: Occurence = buildOccurence1();
    addOccurence(occurence1);
    let occurence: Occurence = occurenceStorage.findById(occurence1.occurence_id);
    expect(occurence.occurence_id).toEqual(occurence1.occurence_id);
    expect(occurence.symptom.name).toEqual(occurence1.symptom.name);
  });

  it('should read all symptoms', () => {
    let occurence1: Occurence = buildOccurence1();
    let occurence2: Occurence = buildOccurence2();
    addFewOccurence();
    let occurences = occurenceStorage.all();
    expect(occurences.length).toEqual(2);
    expect(occurences[0].symptom.name).toEqual(occurence1.symptom.name);
    expect(occurences[1].symptom.name).toEqual(occurence2.symptom.name);
  });
});
