import {} from 'jasmine';
import { ComponentFixture, async, inject } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SymptomsStorage }          from '../../../app/provider/symptoms_storage';

// let fixture: ComponentFixture<SymptomsStorage> = null;
// let instance: any = null;

describe('Symptoms storage', () => {
  var symptomsStorage: any;
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

  it('should store a symptom correclty', function(){
    var symptom = {label: 'test'};
    symptomsStorage.add(symptom);
    expect(symptomsStorage.symptoms.data[0].label).toEqual('test');
  });
});
