import {Category} from "./category";

export class Symptom {

  id: string;
  name: string;
  short_description: string;
  long_description: string;
  category: Category;
  gender_filter: string;

  constructor(name: string) {
    this.id = undefined;
    this.name = name;
    this.short_description = undefined;
    this.long_description = undefined;
    this.category = undefined;
    this.gender_filter = undefined;
  }

}
