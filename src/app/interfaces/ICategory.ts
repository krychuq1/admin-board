export interface ICategory {
  id: number;
  name: string;
  isWomen: boolean;
  isMen: boolean;
  thumbnail: string;
  parentCategory?: ICategory;
}
