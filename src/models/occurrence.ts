import {isNullOrUndefined} from "util";
import {GPSCoordinates} from "./coordinate";
import {FactorInstance} from "./factor_instance";
import {SymptomWithFactor} from "./symptom_with_factors";


export class Occurrence {
  id: string;
  symptom: SymptomWithFactor;
  symptom_id: string;
  date: string;
  gps_coordinate: GPSCoordinates;
  factors: FactorInstance[];
  // photos: Photo[];

  constructor(symptom: SymptomWithFactor, date: string, gps_location: GPSCoordinates, factors: FactorInstance[]) {
    this.symptom = symptom;
    this.date = date;
    this.gps_coordinate = gps_location;
    this.factors = factors;
    if (isNullOrUndefined(this.factors)) {
      this.factors = [];
    }
  }


}
