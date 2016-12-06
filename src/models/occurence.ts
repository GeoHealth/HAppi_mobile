import {Symptom} from './symptom';
import { Geolocation } from 'ionic-native';


export class Occurence {
  occurence_id: string;
  date: string;
  symptom: Symptom;
  gps_location: Coordinates;
  // factors : Factor[];
  // photos: Photo[];

  constructor(symptom: Symptom, date: string, gps_location: Coordinates) {
    this.symptom = symptom;
    this.date = date;
    this.gps_location = gps_location;
  }


}
