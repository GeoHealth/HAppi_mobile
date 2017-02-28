import {SymptomCount} from "./symptom_count";

export class SymptomsCounts {

  unit: string;
  symptoms: SymptomCount[];

  constructor(unit: string, symptoms: SymptomCount[]) {
    this.unit = unit;
    this.symptoms = symptoms;
  }
}
