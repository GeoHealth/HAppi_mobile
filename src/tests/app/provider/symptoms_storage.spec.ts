import {} from 'jasmine';
import { ComponentFixture, async, inject } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SymptomsStorage }          from '../../../app/provider/symptoms_storage';
import {Symptom} from '../../../models/symptom'
// let fixture: ComponentFixture<SymptomsStorage> = null;
// let instance: any = null;

describe('Symptoms storage', () => {
  var symptomsStorage: SymptomsStorage;
  var keyValueStore = {};

  beforeEach(function() {
    symptomsStorage = new SymptomsStorage();

    spyOn(symptomsStorage.store, 'getItem').and.callFake(function (key) {
      return new Promise(function(resolve, reject) {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(symptomsStorage.store, 'setItem').and.callFake(function (key, value) {
      console.log('item set');
      return new Promise(function(resolve, reject) {
        resolve('');
      });
    });
    spyOn(symptomsStorage.store, 'clear').and.callFake(function () {
      keyValueStore = {};
    });
  });

  let symptom_name = "Abdominal Pain";

  let addSymptom = function() {
    let symptom = new Symptom(symptom_name);
    symptomsStorage.add(symptom);
  }

  let addFewSymptoms = function() {
    addSymptom();
    let symptom = new Symptom("Abnormal Facial Expressions");
    symptomsStorage.add(symptom);
  }

  it('should start with an empty database', function(){
    expect(symptomsStorage.size()).toEqual(0);
  });

  it('should store and read a symptom correclty', function(){
    addSymptom();
    expect(symptomsStorage.findByName(symptom_name)[0].name).toEqual(symptom_name);
  });

  it('should be contain one element', function(){
    addSymptom();
    expect(symptomsStorage.size()).toEqual(1);
  });

  it('should throw an exception', function() {
    let symptom = {symptom_id: '', name: 'not symptom', short_description: '', long_description: '', category: null, gender_filter: ''};
    expect( function(){ symptomsStorage.add(symptom); } ).toThrow(new Error("Wrong type adding to symptoms_storage"));
  });

  it('should read all symptoms', function() {
    addFewSymptoms();
    let symptoms = symptomsStorage.all();
    expect(symptoms.length).toEqual(2);
    expect(symptoms[0].name).toEqual(symptom_name);
  })

});
