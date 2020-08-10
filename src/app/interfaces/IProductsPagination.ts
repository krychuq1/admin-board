import { IProduct } from './IProduct';

export interface IProductsPagination {
  products: IProduct[];
  count: number;
}
