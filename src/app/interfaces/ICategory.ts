export interface ICategory {
  id: number;
  name: string;
  namePl: string;
  isWomen: boolean;
  isMen: boolean;
  thumbnail: string;
  parentCategory?: ICategory;
}
