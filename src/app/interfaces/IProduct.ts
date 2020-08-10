import { ICategory } from './ICategory';

export interface IProduct {
  id: string;
  name: string;
  assets: string[];
  price: number;
  title: string;
  amount: number;
  size: ISize;
  sold: boolean;
  color: IColor;
  vat: number;
  thumbnail: string;
  description: string;
  sizeAndFashion: string;
  category: ICategory[];
}
interface IColor {
  id: number;
  name: string;
}
interface ISize {
  id: number;
  name: string;
}
