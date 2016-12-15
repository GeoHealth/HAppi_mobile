export class Category {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  parent_id: number;
  children: Category[];
}
