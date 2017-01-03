import {SymptomsStorage}          from '../../../app/provider/symptoms_storage';
import {SymptomWithFactor} from "../../../models/symptom_with_factors";

describe('SymptomsStorage', () => {
  beforeEach(() => {
    this.symptomsStorage = new SymptomsStorage();
    this.keyValueStore = {};
    this.symptom_name1 = "Abdominal Pain";
    this.symptom_id1 = "1";
    this.symptom_name2 = "Abnormal Facial Expressions";
    this.symptom_id2 = "2";

    this.symptom1 = new SymptomWithFactor(this.symptom_name1);
    this.symptom1.id = this.symptom_id1;

    this.symptom2 = new SymptomWithFactor(this.symptom_name2);
    this.symptom2.id = this.symptom_id2;

    this.addSymptom = (symptom: SymptomWithFactor) => {
      this.symptomsStorage.add(symptom);
    };

    this.addFewSymptoms = () => {
      this.addSymptom(this.symptom1);
      this.addSymptom(this.symptom2);
    };

    spyOn(this.symptomsStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(this.keyValueStore[key]);
      });
    });
    spyOn(this.symptomsStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(this.symptomsStorage.store, 'clear').and.callFake(() => {
      this.keyValueStore = {};
    });
  });

  it('starts with an empty database', () => {
    expect(this.symptomsStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores a symptom', () => {
      expect(this.symptomsStorage.size()).toEqual(0);
      this.symptomsStorage.add(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);
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
        this.symptomsStorage.add(wrong_occurrence);
      }).toThrowError(TypeError);
      expect(this.symptomsStorage.size()).toEqual(0);
    });
  });

  describe('#findByName', () => {
    beforeEach(() => {
      this.addSymptom(this.symptom1);
    });

    it('finds a symptom by its name and returns it', () => {
      expect(this.symptomsStorage.findByName(this.symptom_name1)[0].name).toEqual(this.symptom_name1);
    });

    it('returns an instance of SymptomWithFactor', () => {
      let symptom: SymptomWithFactor = this.symptomsStorage.findByName(this.symptom_name1)[0];
      expect(symptom instanceof SymptomWithFactor).toBeTruthy();
    });
  });

  describe('#size', () => {
    it('returns the number of symptoms stored', () => {
      expect(this.symptomsStorage.size()).toEqual(0);

      this.addSymptom(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.addSymptom(this.symptom2);
      expect(this.symptomsStorage.size()).toEqual(2);
    });
  });

  describe('#all', () => {
    it('reads all symptoms', () => {
      this.addFewSymptoms();
      let symptoms = this.symptomsStorage.all();
      expect(symptoms.length).toEqual(2);
      expect(symptoms[0].name).toEqual(this.symptom_name1);
    });
  });

  describe('#remove', () => {
    it('deletes an existing symptom', () => {
      this.addFewSymptoms();
      expect(this.symptomsStorage.size()).toEqual(2);

      let symptoms = this.symptomsStorage.all();
      this.symptomsStorage.remove(symptoms[0]);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.symptomsStorage.remove(symptoms[1]);
      expect(this.symptomsStorage.size()).toEqual(0);
    });

    it('does nothing when the given symptom does not exist', () => {
      this.addSymptom(this.symptom1);
      expect(this.symptomsStorage.size()).toEqual(1);

      this.symptomsStorage.remove(this.symptom2);
      expect(this.symptomsStorage.size()).toEqual(1);
    });
  });
});
