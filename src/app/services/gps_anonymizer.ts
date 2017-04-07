import { GPSCoordinates } from "../../models/coordinate";
export class GPSAnonymizer {
  /**
   * Anonymize a GPSCoordinates by changing its latitude and longitude to a random value.
   * The actual object is modified but is also returned for convenience.
   * @param coordinates
   * @returns {GPSCoordinates}
   */
  public static anonymize_gps_coordinates(coordinates: GPSCoordinates): GPSCoordinates {
    let {randomLatitude, randomLongitude} = GPSAnonymizer.generate_random_coordinate(coordinates.latitude, coordinates.longitude, 100);
    coordinates.latitude = randomLatitude;
    coordinates.longitude = randomLongitude;
    return coordinates;
  }

  /**
   * source: http://stackoverflow.com/a/31280435/2179668
   * @param latitude
   * @param longitude
   * @param radius
   * @returns {{randomLatitude: number, randomLongitude: number}}
   */
  public static
  generate_random_coordinate(latitude, longitude, radius) {
    let y0 = parseFloat(latitude);
    let x0 = parseFloat(longitude);
    let rd = parseInt(radius, 10) / 111300;

    let u = Math.random();
    let v = Math.random();
    let w = rd * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y1 = w * Math.sin(t);
    let x1 = x / Math.cos(y0);

    let randomLatitude = y0 + y1;
    let randomLongitude = x0 + x1;

    return {randomLatitude, randomLongitude};
  }
}
