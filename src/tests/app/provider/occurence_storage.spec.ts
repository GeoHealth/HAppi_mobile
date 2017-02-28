import {} from 'jasmine';
import {OccurrenceStorage} from '../../../app/provider/occurrence_storage';
import {Occurrence} from '../../../models/occurrence';
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

    let keyValueStore = {};

    spyOn(this.occurrenceStorage.store, 'getItem').and.callFake((key) => {
      return new Promise((resolve, reject) => {
        resolve(keyValueStore[key]);
      });
    });
    spyOn(this.occurrenceStorage.store, 'setItem').and.callFake((key, value) => {
      return new Promise((resolve, reject) => {
        resolve('');
      });
    });
    spyOn(this.occurrenceStorage.store, 'clear').and.callFake(() => {
      keyValueStore = {};
    });
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
      let wrong_occurrence = {
        id: 'id',
        symptom: null,
        symptom_id: 'id',
        date: 'date',
        gps_coordinate: null,
        factors: null
      };
      expect(() => {
        this.occurrenceStorage.add(wrong_occurrence);
      }).toThrowError(TypeError);
      expect(this.occurrenceStorage.size()).toEqual(0);
    });
  });

  describe('#findById', () => {
    beforeEach(() => {
      this.addOccurrence(this.buildOccurrence1());
    });

    it('returns an instance of Occurrence', () => {
      let occurrence: Occurrence = this.occurrenceStorage.findById(this.buildOccurrence1().id);
      expect(occurrence instanceof Occurrence).toBeTruthy();
    });

    it('finds an occurrence by id', () => {
      let occurrence1: Occurrence = this.buildOccurrence1();

      let occurrence: Occurrence = this.occurrenceStorage.findById(occurrence1.id);
      expect(occurrence.id).toEqual(occurrence1.id);
      expect(occurrence.symptom.name).toEqual(occurrence1.symptom.name);
    });
  });

  describe('#all', () => {
    beforeEach(() => {
      this.addOccurrence(this.buildOccurrence1());
      this.addOccurrence(this.buildOccurrence2());
    });

    it('returns all symptoms', () => {
      let occurrences = this.occurrenceStorage.all();
      expect(occurrences.length).toEqual(2);
      expect(occurrences[0].symptom.name).toEqual(this.symptom_name1);
      expect(occurrences[1].symptom.name).toEqual(this.symptom_name2);
    });

    it('returns an array of instances of Occurrence', () => {
      let occurrences = this.occurrenceStorage.all();
      for (let occurrence of occurrences) {
        expect(occurrence instanceof Occurrence).toBeTruthy();
      }
    });
  });


});
