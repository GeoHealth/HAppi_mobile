import {Category} from './caterogy'

export class Symptom {

    symptom_id: string;
    name: string;
    short_description: string;
    long_description: string;
    category: Category;
    gender_filter: string;

    constructor( name: string) {
      this.name = name;
    }

    // get name(): string {
    //   return this._name;
    // }
}
