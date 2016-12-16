import {SymptomsStorage}          from '../../../app/provider/symptoms_storage';
import {Symptom} from '../../../models/symptom';

describe('Symptoms storage', () => {
  let symptomsStorage: SymptomsStorage;
  let keyValueStore = {};

  beforeEach(() => {
    symptomsStorage = new SymptomsStorage();

    spyOn(symptomsStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(symptomsStorage.store, 'setItem').and.callFake((key, value) => {
      console.log('item set');
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(symptomsStorage.store, 'clear').and.callFake(() => {
      keyValueStore = {};
    });
  });

  let symptom_name = "Abdominal Pain";

  let buildSymptom1 = () => {
    return new Symptom(symptom_name);
  };

  let addSymptom = (symptom: Symptom) => {
    symptomsStorage.add(symptom);
  };

  let addFewSymptoms = () => {
    addSymptom(buildSymptom1());
    let symptom = new Symptom("Abnormal Facial Expressions");
    symptomsStorage.add(symptom);
  };

  it('should start with an empty database', () => {
    expect(symptomsStorage.size()).toEqual(0);
  });

  it('should store and read a symptom correclty', () => {
    addSymptom(buildSymptom1());
    expect(symptomsStorage.findByName(symptom_name)[0].name).toEqual(symptom_name);
  });

  it('should be contain one element', () => {
    addSymptom(buildSymptom1());
    expect(symptomsStorage.size()).toEqual(1);
  });

  it('should throw an exception', () => {
    let symptom = {
      id: '',
      name: 'not symptom',
      short_description: '',
      long_description: '',
      category: null,
      gender_filter: ''
    };
    expect(() => {
      symptomsStorage.add(symptom as Symptom);
    }).toThrow(new Error("Wrong type adding to symptoms_storage"));
  });

  it('should read all symptoms', () => {
    addFewSymptoms();
    let symptoms = symptomsStorage.all();
    expect(symptoms.length).toEqual(2);
    expect(symptoms[0].name).toEqual(symptom_name);
  });

  it('should delete a symptom correclty', () => {
    let symptoms = symptomsStorage.all();
    expect(symptoms.length).toEqual(0);

    addFewSymptoms();
    symptoms = symptomsStorage.all();
    expect(symptoms.length).toEqual(2);
    expect(symptoms[0].name).toEqual(symptom_name);

    symptomsStorage.remove(symptoms[0]);
    expect(symptoms.length).toEqual(1);
    expect(symptoms[0].name).not.toEqual(symptom_name);
  });

});
