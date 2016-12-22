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
    instance.factors = object.factors;
    return instance;
  }

  static convertObjectsToInstancesArray(objects: any[]): SymptomWithFactor[] {
    let instances: SymptomWithFactor[] = [];
    for (let object of objects) {
      instances.push(SymptomWithFactor.convertObjectToInstance(object));
    }
    return instances;
  }
}
