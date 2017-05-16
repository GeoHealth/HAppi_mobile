import { SymptomsStorage } from "../../../app/provider/symptoms_storage";
import { SymptomWithFactor } from "../../../models/symptom_with_factors";
import { CrashlyticsMock } from "../../mocks";

let symptomsStorage: SymptomsStorage;

describe('SymptomsStorage', () => {
  beforeAll(
    (done) => {
      symptomsStorage = new SymptomsStorage(new CrashlyticsMock() as any);
      setTimeout(
        () => {
          done();
        },
        100);
    },
    10000);

  afterAll(() => {
    symptomsStorage = null;
  });

  beforeEach(() => {
    this.symptom_name1 = "Abdominal Pain";
    this.symptom_id1 = "1";
    this.symptom_name2 = "Abnormal Facial Expressions";
    this.symptom_id2 = "2";

    this.symptom1 = new SymptomWithFactor(this.symptom_name1);
    this.symptom1.id = this.symptom_id1;

    this.symptom2 = new SymptomWithFactor(this.symptom_name2);
    this.symptom2.id = this.symptom_id2;

    this.addSymptom = (symptom: SymptomWithFactor) => {
      symptomsStorage.add(symptom);
    };

    this.addFewSymptoms = () => {
      this.addSymptom(this.symptom1);
      this.addSymptom(this.symptom2);
    };
  });

  afterEach((done) => {
    this.symptom_name1 = null;
    this.symptom_id1 = null;
    this.symptom_name2 = null;
    this.symptom_id2 = null;
    this.symptom1 = null;
    this.symptom2 = null;
    this.addSymptom = null;
    this.addFewSymptoms = null;
    symptomsStorage.removeAll().subscribe(() => {
      done();
    });
  });

  it('starts with an empty database', () => {
    expect(symptomsStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores a symptom', () => {
      expect(symptomsStorage.size()).toEqual(0);
      symptomsStorage.add(this.symptom1);
      expect(symptomsStorage.size()).toEqual(1);
    });

    it('refuses an object that is not a SymptomWithFactor by throwing a TypeError exception', () => {
      this.wrong_symptom = {
        id: 'id',
        name: 'name',
        short_description: 'short',
        long_description: 'long',
        gender_filter: 'both',
        category: null,
        factors: null
      };
      expect(() => {
        symptomsStorage.add(this.wrong_symptom);
      }).toThrowError(TypeError);
      expect(symptomsStorage.size()).toEqual(0);

      this.wrong_symptom = null;
    });
  });

  describe('#addAll', () => {
    it('stores all symptoms', () => {
      expect(symptomsStorage.size()).toEqual(0);
      symptomsStorage.addAll([this.symptom1, this.symptom2]);
      expect(symptomsStorage.size()).toEqual(2);
    });

    it('throws a TypeError exception if any object is not a SymptomWithFactor', () => {
      this.wrong_symptom = {
        id: 'id',
        name: 'name',
        short_description: 'short',
        long_description: 'long',
        gender_filter: 'both',
        category: null,
        factors: null
      };
      expect(() => {
        symptomsStorage.addAll([this.symptom1, this.wrong_symptom]);
      }).toThrowError(TypeError);
      expect(symptomsStorage.size()).toEqual(1);

      this.wrong_symptom = null;
    });
  });

  describe('#findByName', () => {
    beforeEach(() => {
      this.addSymptom(this.symptom1);
    });

    it('finds a symptom by its name and returns it', () => {
      expect(symptomsStorage.findByName(this.symptom_name1)[0].name).toEqual(this.symptom_name1);
    });

    it('returns an instance of SymptomWithFactor', () => {
      this.symptom = symptomsStorage.findByName(this.symptom_name1)[0];
      expect(this.symptom instanceof SymptomWithFactor).toBeTruthy();

      this.symptom = null;
    });
  });

  describe('#size', () => {
    it('returns the number of symptoms stored', () => {
      expect(symptomsStorage.size()).toEqual(0);

      this.addSymptom(this.symptom1);
      expect(symptomsStorage.size()).toEqual(1);

      this.addSymptom(this.symptom2);
      expect(symptomsStorage.size()).toEqual(2);
    });
  });

  describe('#all', () => {
    it('reads all symptoms', () => {
      this.addFewSymptoms();
      this.symptoms = symptomsStorage.all();
      expect(this.symptoms.length).toEqual(2);
      expect(this.symptoms[0].name).toEqual(this.symptom_name1);

      this.symptoms = null;
    });
  });

  describe('#remove', () => {
    it('deletes an existing symptom', () => {
      this.addFewSymptoms();
      expect(symptomsStorage.size()).toEqual(2);

      this.symptoms = symptomsStorage.all();
      symptomsStorage.remove(this.symptoms[0]);
      expect(symptomsStorage.size()).toEqual(1);

      symptomsStorage.remove(this.symptoms[1]);
      expect(symptomsStorage.size()).toEqual(0);

      this.symptoms = null;
    });

    it('does nothing when the given symptom does not exist', () => {
      this.addSymptom(this.symptom1);
      expect(symptomsStorage.size()).toEqual(1);

      symptomsStorage.remove(this.symptom2);
      expect(symptomsStorage.size()).toEqual(1);
    });
  });
});
