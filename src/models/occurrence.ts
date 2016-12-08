import {Symptom} from './symptom';


export class Occurrence {
  occurrence_id: string;
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
