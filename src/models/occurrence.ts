import {Symptom} from './symptom';
import {Factor} from "./factor";
import {isNullOrUndefined} from "util";


export class Occurrence {
  occurrence_id: string;
  symptom: Symptom;
  date: string;
  gps_location: Coordinates;
  factors: Factor[];
  // photos: Photo[];

  constructor(symptom: Symptom, date: string, gps_location: Coordinates, factors: Factor[]) {
    this.symptom = symptom;
    this.date = date;
    this.gps_location = gps_location;
    this.factors = factors;
    if (isNullOrUndefined(this.factors)){
      this.factors = [];
    }
  }


}
