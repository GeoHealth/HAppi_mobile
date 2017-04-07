import {} from "jasmine";
import {OccurrenceStorage} from "../../../app/provider/occurrence_storage";
import {Occurrence} from "../../../models/occurrence";
import {DateProvider} from "../../../app/provider/date_provider";
import {SymptomWithFactor} from "../../../models/symptom_with_factors";
import {CrashlyticsMock} from "../../mocks";

describe('OccurrenceStorage', () => {
  beforeEach(() => {
    this.occurrenceStorage = new OccurrenceStorage(new CrashlyticsMock() as any);
    this.symptom_name1 = "Abdominal Pain";
    this.symptom_name2 = "Abnormal Facial Expressions";

    this.buildSymptom1 = (): SymptomWithFactor => {
      return new SymptomWithFactor(this.symptom_name1);
    };

    this.buildSymptom2 = (): SymptomWithFactor => {
      return new SymptomWithFactor(this.symptom_name2);
    };

    this.buildOccurrence1 = (): Occurrence => {
      return new Occurrence(this.buildSymptom1(), DateProvider.getCurrentISODateAsString(), null, null);
    };

    this.buildOccurrence2 = (): Occurrence => {
      return new Occurrence(this.buildSymptom2(), DateProvider.getCurrentISODateAsString(), null, null);
    };

    this.addOccurrence = (newOccurrence) => {
      this.occurrenceStorage.add(newOccurrence);
    };

    this.keyValueStore = {};

    spyOn(this.occurrenceStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(this.keyValueStore[key]);
      });
    });
    spyOn(this.occurrenceStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(this.occurrenceStorage.store, 'clear').and.callFake(() => {
      this.keyValueStore = {};
    });
  });

  afterEach(() => {
    this.occurrenceStorage = null;
    this.symptom_name1 = null;
    this.symptom_name2 = null;
    this.buildSymptom1 = null;
    this.buildSymptom2 = null;
    this.buildOccurrence1 = null;
    this.buildOccurrence2 = null;
    this.addOccurrence = null;
    this.keyValueStore = null;
  });

  it('starts with an empty database', () => {
    expect(this.occurrenceStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores an occurrence to the database', () => {
      expect(this.occurrenceStorage.size()).toEqual(0);
      this.occurrenceStorage.add(this.buildOccurrence1());
      expect(this.occurrenceStorage.size()).toEqual(1);
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
        this.occurrenceStorage.add(this.wrong_occurrence);
      }).toThrowError(TypeError);
      expect(this.occurrenceStorage.size()).toEqual(0);

      this.wrong_occurrence = null;
    });
  });

  describe('#findById', () => {
    beforeEach(() => {
      this.addOccurrence(this.buildOccurrence1());
    });

    it('returns an instance of Occurrence', () => {
      expect(this.occurrenceStorage.findById(this.buildOccurrence1().id) instanceof Occurrence).toBeTruthy();
    });

    it('finds an occurrence by id', () => {
      this.occurrence1 = this.buildOccurrence1();

      this.occurrence = this.occurrenceStorage.findById(this.occurrence1.id);
      expect(this.occurrence.id).toEqual(this.occurrence1.id);
      expect(this.occurrence.symptom.name).toEqual(this.occurrence1.symptom.name);

      this.occurrence1 = null;
      this.occurrence = null;
    });
  });

  describe('#all', () => {
    beforeEach(() => {
      this.addOccurrence(this.buildOccurrence1());
      this.addOccurrence(this.buildOccurrence2());
    });

    it('returns all symptoms', () => {
      this.occurrences = this.occurrenceStorage.all();
      expect(this.occurrences.length).toEqual(2);
      expect(this.occurrences[0].symptom.name).toEqual(this.symptom_name1);
      expect(this.occurrences[1].symptom.name).toEqual(this.symptom_name2);

      this.occurrences = null;
    });

    it('returns an array of instances of Occurrence', () => {
      this.occurrences = this.occurrenceStorage.all();
      for (let occurrence of this.occurrences) {
        expect(occurrence instanceof Occurrence).toBeTruthy();
      }
    });
  });
});
