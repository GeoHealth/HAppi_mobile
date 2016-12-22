import {Symptom} from "./symptom";
import {Factor} from "./factor";

export class SymptomWithFactor extends Symptom {
  factors: Factor[];

  constructor(name: string) {
    super(name);
    this.factors = [];
  }

  static convertObjectToInstance(object: any): SymptomWithFactor {
    let instance = new SymptomWithFactor(object.name);
    instance.id = object.id;
    instance.short_description = object.short_description;
    instance.long_description = object.long_description;
    instance.category = object.category;
    instance.gender_filter = object.gender_filter;
    return instance;
  }
}
