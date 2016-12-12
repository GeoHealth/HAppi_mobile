export class Factor {
  factor_id: string;
  type: string;
  value: string;

  constructor (id: string, type: string, value: string){
    this.factor_id = id;
    this.type = type;
    this.value = value;
  }
}
