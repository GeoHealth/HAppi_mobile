
import {GPSCoordinates} from "../../models/coordinate";
describe('GPSCoordinates', () => {

  describe('#constructor', () => {
    let latitude = 50.65;
    let longitude = 4.06;
    let altitude = 25.2;
    let accuracy = 10;
    let altitudeAccuracy = 10;
    let speed = 20.0;
    let heading = 1;

    it('initializes the object with all the attributes', () => {
      let coordinates = {
        "latitude": latitude,
        "longitude": longitude,
        "altitude": altitude,
        "accuracy": accuracy,
        "altitudeAccuracy": altitudeAccuracy,
        "speed": speed,
        "heading": heading
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
