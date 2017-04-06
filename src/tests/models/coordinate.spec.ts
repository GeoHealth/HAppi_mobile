import {GPSCoordinates} from "../../models/coordinate";

describe('GPSCoordinates', () => {

  describe('#constructor', () => {
    beforeEach(() => {
      this.latitude = 50.65;
      this.longitude = 4.06;
      this.altitude = 25.2;
      this.accuracy = 10;
      this.altitudeAccuracy = 10;
      this.speed = 20.0;
      this.heading = 1;
    });

    it('initializes the object with all the attributes', () => {
      this.coordinates = {
        "latitude": this.latitude,
        "longitude": this.longitude,
        "altitude": this.altitude,
        "accuracy": this.accuracy,
        "altitudeAccuracy": this.altitudeAccuracy,
        "speed": this.speed,
        "heading": this.heading
      };
      this.gps_coordinates = new GPSCoordinates(this.coordinates);

      expect(this.gps_coordinates.latitude).toEqual(this.coordinates.latitude);
      expect(this.gps_coordinates.longitude).toEqual(this.coordinates.longitude);
      expect(this.gps_coordinates.altitude).toEqual(this.coordinates.altitude);
      expect(this.gps_coordinates.accuracy).toEqual(this.coordinates.accuracy);
      expect(this.gps_coordinates.altitude_accuracy).toEqual(this.coordinates.altitudeAccuracy);
      expect(this.gps_coordinates.speed).toEqual(this.coordinates.speed);
      expect(this.gps_coordinates.heading).toEqual(this.coordinates.heading);
    });
  });

});
