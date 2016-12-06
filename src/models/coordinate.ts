export class GPSCoordinates {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
  latitude: number;
  longitude: number;

  constructor(coordinates: Coordinates){
    this.accuracy = coordinates.accuracy;
    this.altitude = coordinates.altitude;
    this.altitudeAccuracy = coordinates.altitudeAccuracy;
    this.heading = coordinates.heading;
    this.speed = coordinates.speed;
    this.latitude = coordinates.latitude;
    this.longitude = coordinates.longitude;
  }
}
