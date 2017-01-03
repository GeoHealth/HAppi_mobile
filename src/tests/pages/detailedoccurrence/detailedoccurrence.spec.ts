import {DetailedOccurrencePage} from "../../../pages/detailedoccurrence/detailedoccurrence";
import {NavMock, NavParamsMock} from "../../mocks";
import {OccurrenceStorage} from "../../../app/provider/occurrence_storage";
import {Geolocation} from 'ionic-native';

describe('DetailedOccurrencePage', () => {

  beforeEach(() => {
    this.detailed_occurrence = new DetailedOccurrencePage(new NavMock() as any, new NavParamsMock() as any, new OccurrenceStorage(), null);

    spyOn(this.detailed_occurrence, 'retrieveCurrentLocation');
    spyOn(this.detailed_occurrence, 'addFactorsToOccurrence');

    spyOn(Geolocation, 'getCurrentPosition').and.callFake(() => {
      return new Promise((resolve) => {
        resolve({
          "coords": {
            "latitude ": 10.0,
            "longitude ": 5.0,
            "altitude ": 25.0,
            "accuracy ": 10,
            "altitudeAccuracy ": 10,
            "speed ": 20.0,
            "heading ": 1,
          }
        });
      })
    });
  });

  describe('#constructor', () => {
    it('creates an Occurrence based on the symptom provided in NavParams', () => {
      expect(this.detailed_occurrence.occurrence).toBeDefined();
    });

    xit('retrieves the current location asynchronously', () => {
      expect(this.detailed_occurrence.retrieveCurrentLocation).toHaveBeenCalled();
    });
  });
});
