import {SymptomsStorage}          from '../../../app/provider/symptoms_storage';
import {SymptomWithFactor} from "../../../models/symptom_with_factors";

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

  let symptom_name1 = "Abdominal Pain";
  let symptom_id1 = "1";
  let symptom_name2 = "Abnormal Facial Expressions";
  let symptom_id2 = "2";

  let buildSymptom1 = () => {
    let symptom = new SymptomWithFactor(symptom_name1);
    symptom.id = symptom_id1;
    return symptom;
  };

  let buildSymptom2 = () => {
    let symptom = new SymptomWithFactor(symptom_name2);
    symptom.id = symptom_id2;
    return symptom;
  };

  let addSymptom = (symptom: SymptomWithFactor) => {
    symptomsStorage.add(symptom);
  };

  let addFewSymptoms = () => {
    addSymptom(buildSymptom1());
    addSymptom(buildSymptom2());
  };

  it('starts with an empty database', () => {
    expect(symptomsStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores a symptom', () => {
      expect(symptomsStorage.size()).toEqual(0);
      symptomsStorage.add(buildSymptom1());
      expect(symptomsStorage.size()).toEqual(1);
    });

    it('refuses an object that is not a SymptomWithFactor by throwing a TypeError exception', () => {
      let wrong_occurrence = {
        id: 'id',
        name: 'name',
        short_description: 'short',
        long_description: 'long',
        gender_filter: 'both',
        category: null,
        factors: null
      };
      expect(() => {
        symptomsStorage.add(wrong_occurrence);
      }).toThrowError(TypeError);
      expect(symptomsStorage.size()).toEqual(0);
    });
  });

  describe('#findByName', () => {
    beforeEach(() => {
      addSymptom(buildSymptom1());
    });

    it('finds a symptom by its name and returns it', () => {
      expect(symptomsStorage.findByName(symptom_name1)[0].name).toEqual(symptom_name1);
    });

    it('returns an instance of SymptomWithFactor', () => {
      let symptom: SymptomWithFactor = symptomsStorage.findByName(symptom_name1)[0];
      expect(symptom instanceof SymptomWithFactor).toBeTruthy();
    });
  });

  describe('#size', () => {
    it('returns the number of symptoms stored', () => {
      expect(symptomsStorage.size()).toEqual(0);

      addSymptom(buildSymptom1());
      expect(symptomsStorage.size()).toEqual(1);

      addSymptom(buildSymptom2());
      expect(symptomsStorage.size()).toEqual(2);
    });
  });

  describe('#all', () => {
    it('reads all symptoms', () => {
      addFewSymptoms();
      let symptoms = symptomsStorage.all();
      expect(symptoms.length).toEqual(2);
      expect(symptoms[0].name).toEqual(symptom_name1);
    });
  });

  describe('#remove', () => {
    it('deletes an existing symptom', () => {
      addFewSymptoms();
      expect(symptomsStorage.size()).toEqual(2);

      let symptoms = symptomsStorage.all();
      symptomsStorage.remove(symptoms[0]);
      expect(symptomsStorage.size()).toEqual(1);

      symptomsStorage.remove(symptoms[1]);
      expect(symptomsStorage.size()).toEqual(0);
    });

    it('does nothing when the given symptom does not exist', () => {
      addSymptom(buildSymptom1());
      expect(symptomsStorage.size()).toEqual(1);

      symptomsStorage.remove(buildSymptom2());
      expect(symptomsStorage.size()).toEqual(1);
    });
  });


})
;
