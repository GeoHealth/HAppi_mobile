import {CountPerDate} from './count_per_date';

export class SymptomCount {

  id: number;
  name: string;
  counts: CountPerDate[];

  constructor(id: number, name: string, counts: CountPerDate[]) {
    this.id = id;
    this.name = name;
    this.counts = counts;
  }
}
