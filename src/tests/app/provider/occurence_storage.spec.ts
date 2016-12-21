import {} from 'jasmine';
import {OccurrenceStorage} from '../../../app/provider/occurrence_storage';
import {Occurrence} from '../../../models/occurrence';
import {DateProvider} from "../../../app/provider/date_provider";
import {SymptomWithFactor} from "../../../models/symptom_with_factors";

describe('OccurrenceStorage', () => {
  let buildSymptom1 = (): SymptomWithFactor => {
    return new SymptomWithFactor("Abdominal Pain");
  };

  let buildSymptom2 = (): SymptomWithFactor => {
    return new SymptomWithFactor("Abnormal Facial Expressions");
  };

  let buildOccurrence1 = (): Occurrence => {
    return new Occurrence(buildSymptom1(), DateProvider.getCurrentISODateAsString(), null, null);
  };

  let buildOccurrence2 = (): Occurrence => {
    return new Occurrence(buildSymptom2(), DateProvider.getCurrentISODateAsString(), null, null);
  };

  let addOccurrence = (newOccurrence) => {
    this.occurrenceStorage.add(newOccurrence);
  };

  beforeEach(() => {
    this.occurrenceStorage = new OccurrenceStorage();

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

  it('starts with an empty database', () => {
    expect(this.occurrenceStorage.size()).toEqual(0);
  });

  describe('#add', () => {
    it('stores an occurrence to the database', () => {
      expect(this.occurrenceStorage.size()).toEqual(0);
      this.occurrenceStorage.add(buildOccurrence1());
      expect(this.occurrenceStorage.size()).toEqual(1);
    });

    it('refuses an object that is not an Occurrence', () => {
      let wrong_occurrence = {
        id: 'id',
        symptom: null,
        symptom_id: 'id',
        date: 'date',
        gps_coordinate: null,
        factors: null
      };
      expect(() => {
        this.occurrenceStorage.add(wrong_occurrence)
      }).toThrowError(TypeError);
      expect(this.occurrenceStorage.size()).toEqual(0);
    })
  });

  describe('#findById', () => {
    it('returns an instance of Occurrence', () => {
      addOccurrence(buildOccurrence1());
      let occurrence: Occurrence = this.occurrenceStorage.findById(buildOccurrence1().id);
      expect(occurrence instanceof Occurrence).toBeTruthy();
    });

    it('finds an occurrence by id', () => {
      let occurrence1: Occurrence = buildOccurrence1();
      addOccurrence(occurrence1);

      let occurrence: Occurrence = this.occurrenceStorage.findById(occurrence1.id);
      expect(occurrence.id).toEqual(occurrence1.id);
      expect(occurrence.symptom.name).toEqual(occurrence1.symptom.name);
    });
  });

  describe('#all', () => {
    it('reads all symptoms', () => {
      let occurrence1: Occurrence = buildOccurrence1();
      let occurrence2: Occurrence = buildOccurrence2();
      addOccurrence(buildOccurrence1());
      addOccurrence(buildOccurrence2());

      let occurrences = this.occurrenceStorage.all();
      expect(occurrences.length).toEqual(2);
      expect(occurrences[0].symptom.name).toEqual(occurrence1.symptom.name);
      expect(occurrences[1].symptom.name).toEqual(occurrence2.symptom.name);
    });
  });


});
