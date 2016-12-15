import {Symptom} from "./symptom";
import {Factor} from "./factor";
export class SymptomWithFactor extends Symptom {
  factors: Factor[];

  constructor(name: string){
    super(name);
    this.factors = undefined;
  }
}
