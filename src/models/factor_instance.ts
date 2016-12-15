import {Factor} from "./factor";
export class FactorInstance{
  id: number;
  factor: Factor;
  value: string;

  constructor (factor: Factor, value: string){
    this.factor = factor;
    this.value = value;
  }
}
