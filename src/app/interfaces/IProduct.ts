import { ICategory } from './ICategory';

export interface IProduct {
  id?: string;
  name: string;
  assets: string[];
  price: number;
  promoPrice?: number;
  title: string;
  amount: number;
  size: ISize;
  sold: boolean;
  color: IColor;
  vat: number;
  thumbnail: string;
  isOversize: boolean;
  video?: string;
  isModel?: boolean;
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
