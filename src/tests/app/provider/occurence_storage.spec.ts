import { OccurrenceStorage } from "../../../app/provider/occurrence_storage";
import { Occurrence } from "../../../models/occurrence";
import { DateProvider } from "../../../app/provider/date_provider";
import { SymptomWithFactor } from "../../../models/symptom_with_factors";
import { CrashlyticsMock } from "../../mocks";

let occurrenceStorage: OccurrenceStorage;

describe('OccurrenceStorage', () => {
  beforeAll(
    (done) => {
      occurrenceStorage = new OccurrenceStorage(new CrashlyticsMock() as any);
      setTimeout(
        () => {
          done();
        },
        100);
    },
    20000);

  afterAll(() => {
    occurrenceStorage = null;
  });

  beforeEach(() => {
    this.symptom_name1 = "Abdominal Pain";
    this.symptom_name2 = "Abnormal Facial Expressions";

    this.buildSymptom1 = (): SymptomWithFactor => {
      return new SymptomWithFactor(this.symptom_name1);
    };

    this.buildSymptom2 = (): SymptomWithFactor => {
      return new SymptomWithFactor(this.symptom_name2);
    };

    this.occurrence1 = new Occurrence(this.buildSymptom1(), DateProvider.getCurrentISODateAsString(), null, null);
    this.occurrence1.id = "1";

    this.occurrence2 = new Occurrence(this.buildSymptom2(), DateProvider.getCurrentISODateAsString(), null, null);
    this.occurrence2.id = "2";

    this.addOccurrence = (newOccurrence) => {
      occurrenceStorage.add(newOccurrence);
    };

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(
    (done) => {
      this.symptom_name1 = null;
      this.symptom_name2 = null;
      this.buildSymptom1 = null;
      this.buildSymptom2 = null;
      this.occurrence1 = null;
      this.occurrence2 = null;
      this.addOccurrence = null;
      occurrenceStorage.removeAll().subscribe(() => {
        done();
      });
    },
    20000);

  it('starts with an empty database', () => {
    expect(occurrenceStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores an occurrence to the database', (done) => {
      expect(occurrenceStorage.size()).toEqual(0);
      occurrenceStorage.add(this.occurrence1).subscribe(() => {
        expect(occurrenceStorage.size()).toEqual(1);
        done();
      });
    });

    it('refuses an object that is not an Occurrence by throwing a TypeError exception', () => {
      this.wrong_occurrence = {
        id: 'id',
        symptom: null,
        symptom_id: 'id',
        date: 'date',
        gps_coordinate: null,
        factors: null
      };
      expect(() => {
        occurrenceStorage.add(this.wrong_occurrence);
      }).toThrowError(TypeError);
      expect(occurrenceStorage.size()).toEqual(0);

      this.wrong_occurrence = null;
    });
  });

  describe('#addAll', () => {
    it('stores all occurrences', () => {
      expect(occurrenceStorage.size()).toEqual(0);
      occurrenceStorage.addAll([this.occurrence1, this.occurrence2]);
      expect(occurrenceStorage.size()).toEqual(2);
    });

    it('throws a TypeError exception if any object is not a Occurrence', () => {
      this.wrong_occurrence = {
        id: 'id',
        name: 'name',
        short_description: 'short',
        long_description: 'long',
        gender_filter: 'both',
        category: null,
        factors: null
      };
      expect(() => {
        occurrenceStorage.addAll([this.occurrence1, this.wrong_occurrence]);
      }).toThrowError(TypeError);
      expect(occurrenceStorage.size()).toEqual(1);

      this.wrong_occurrence = null;
    });
  });

  describe('#findById', () => {
    beforeEach(() => {
      this.addOccurrence(this.occurrence1);
    });

    it('returns an instance of Occurrence', () => {
      expect(occurrenceStorage.findById(this.occurrence1.id) instanceof Occurrence).toBeTruthy();
    });

    it('finds an occurrence by id', () => {
      this.occurrence = occurrenceStorage.findById(this.occurrence1.id);
      expect(this.occurrence.id).toEqual(this.occurrence1.id);
      expect(this.occurrence.symptom.name).toEqual(this.occurrence1.symptom.name);

      this.occurrence1 = null;
      this.occurrence = null;
    });
  });

  describe('#all', () => {
    beforeEach(() => {
      this.addOccurrence(this.occurrence1);
      this.addOccurrence(this.occurrence2);
    });

    it('returns all occurrences', () => {
      this.occurrences = occurrenceStorage.all();
      expect(this.occurrences.length).toEqual(2);
      expect(this.occurrences[0].symptom.name).toEqual(this.symptom_name1);
      expect(this.occurrences[1].symptom.name).toEqual(this.symptom_name2);

      this.occurrences = null;
    });

    it('returns an array of instances of Occurrence', () => {
      this.occurrences = occurrenceStorage.all();
      for (let occurrence of this.occurrences) {
        expect(occurrence instanceof Occurrence).toBeTruthy();
      }
    });
  });

  describe('#remove', () => {
    it('deletes an existing occurrence', () => {
      this.addOccurrence(this.occurrence1);
      this.addOccurrence(this.occurrence2);
      expect(occurrenceStorage.size()).toEqual(2);

      this.occurrences = occurrenceStorage.all();
      occurrenceStorage.remove(this.occurrences[0]);
      expect(occurrenceStorage.size()).toEqual(1);

      occurrenceStorage.remove(this.occurrences[1]);
      expect(occurrenceStorage.size()).toEqual(0);

      this.occurrences = null;
    });

    it('does nothing when the given occurrence does not exist', () => {
      this.addOccurrence(this.occurrence1);
      expect(occurrenceStorage.size()).toEqual(1);

      occurrenceStorage.remove(this.occurrence2);
      expect(occurrenceStorage.size()).toEqual(1);
    });
  });
});
