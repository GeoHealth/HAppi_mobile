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
      let coordinates = {
        "latitude": this.latitude,
        "longitude": this.longitude,
        "altitude": this.altitude,
        "accuracy": this.accuracy,
        "altitudeAccuracy": this.altitudeAccuracy,
        "speed": this.speed,
        "heading": this.heading
      };
      let gps_coordinates = new GPSCoordinates(coordinates);

      expect(gps_coordinates.latitude).toEqual(coordinates.latitude);
      expect(gps_coordinates.longitude).toEqual(coordinates.longitude);
      expect(gps_coordinates.altitude).toEqual(coordinates.altitude);
      expect(gps_coordinates.accuracy).toEqual(coordinates.accuracy);
      expect(gps_coordinates.altitude_accuracy).toEqual(coordinates.altitudeAccuracy);
      expect(gps_coordinates.speed).toEqual(coordinates.speed);
      expect(gps_coordinates.heading).toEqual(coordinates.heading);
    });
  });

});
