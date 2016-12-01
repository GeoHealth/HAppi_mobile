import {Symptom} from './symptom';

export class Occurence {
  occurence_id: string;
  date: string;
  symptom: Symptom;
  // gps_location: GPSLocation;
  // factors : Factor[];
  // photos: Photo[];

  constructor(symptom: Symptom, date: string) {
    this.symptom = symptom;
    this.date = date;
  }
}
