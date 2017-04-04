import {} from "jasmine";
import { GPSAnonymizer } from "../../../app/services/gps_anonymizer";
import { GPSCoordinates } from "../../../models/coordinate";

describe('GPSAnonymizer', () => {

  describe('.generate_random_coordinate', () => {
    describe('when latitude = 50.0, longitude = 4.0 and radius = 0', () => {
      it('returns the same latitude and longitude', () => {
        expect(GPSAnonymizer.generate_random_coordinate(50.0, 4.0, 0)).toEqual({
          randomLatitude: 50.0,
          randomLongitude: 4.0
        });
      });
    });

    describe('when latitude = 50.0, longitude = 4.0 and radius = 100', () => {
      it('returns a random latitude and longitude with more or less 0.0005 degrees of difference', () => {
        let {randomLatitude, randomLongitude} = GPSAnonymizer.generate_random_coordinate(50.0, 4.0, 100);
        expect(randomLatitude).toBeCloseTo(50.0, 0.0005);
        expect(randomLongitude).toBeCloseTo(4.0, 0.0005);
      });
    });

    describe('when latitude and longitude are undefined', () => {
      it('returns NaN values', () => {
        let {randomLatitude, randomLongitude} = GPSAnonymizer.generate_random_coordinate(undefined, undefined, 0);
        expect(randomLatitude).toBeNaN();
        expect(randomLongitude).toBeNaN();
      });
    });
  });

  describe('.anonymize_gps_coordinates', () => {
    beforeEach(() => {
      this.latitude = 50.0;
      this.longitude = 4.0;
      this.gps_coordinate = new GPSCoordinates({"latitude": this.latitude, "longitude": this.longitude} as Coordinates);
    });

    it('returns the same object', () => {
      let givenObject = this.gps_coordinate;
      expect(GPSAnonymizer.anonymize_gps_coordinates(givenObject)).toBe(givenObject);
    });

    it('calls GPSAnonymizer.generate_random_coordinate', () => {
      spyOn(GPSAnonymizer, 'generate_random_coordinate').and.callThrough();
      GPSAnonymizer.anonymize_gps_coordinates(this.gps_coordinate);
      expect(GPSAnonymizer.generate_random_coordinate).toHaveBeenCalled();
    });

    it('updates the latitude and longitude', () => {
      let actual = GPSAnonymizer.anonymize_gps_coordinates(this.gps_coordinate);
      expect(actual.latitude).not.toEqual(this.latitude);
      expect(actual.longitude).not.toEqual(this.longitude);
    });
  })
});
