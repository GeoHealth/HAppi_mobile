import {} from 'jasmine'
import { OccurenceStorage }          from '../../../app/provider/occurence_storage';
import {Symptom} from '../../../models/symptom'
import {Occurence} from '../../../models/occurence'

describe('Occurence storage', () => {
  let occurenceStorage: OccurenceStorage;
  let keyValueStore = {};

  beforeEach(() => {
    occurenceStorage = new OccurenceStorage();

    spyOn(occurenceStorage.store, 'getItem').and.callFake(function (key) {
      return new Promise(function(resolve, reject) {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(occurenceStorage.store, 'setItem').and.callFake(function (key, value) {
      return new Promise(function(resolve, reject) {
        resolve('');
      });
    });
    spyOn(occurenceStorage.store, 'clear').and.callFake(function () {
      keyValueStore = {};
    });
  });

  function buildSymptom1() : Symptom{
    return new Symptom("Abdominal Pain");
  }

  function buildOccurence1() : Occurence{
    return new Occurence(buildSymptom1(), new Date().toISOString());
  }

  let addOccurence = function(newOccurence){
    occurenceStorage.add(newOccurence);
  };

  it('should start with an empty database', () =>{
    expect(occurenceStorage.size()).toEqual(0);
  });

  it('should store an occurence correclty', () =>{
    addOccurence(buildOccurence1());
    expect(occurenceStorage.size()).toEqual(1);
  });

  it('should read an occurence correctly', () =>{
    let occurence1: Occurence = buildOccurence1();
    addOccurence(occurence1);
    let occurence: Occurence = occurenceStorage.findById(occurence1.occurence_id);
    expect(occurence.occurence_id).toEqual(occurence1.occurence_id);
    expect(occurence.symptom.name).toEqual(occurence1.symptom.name);
  });
});