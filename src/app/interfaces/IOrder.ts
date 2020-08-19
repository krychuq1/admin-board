import { IAddress } from './IAddress';
import { IPayment } from './IPayment';
import { IProduct } from './IProduct';
import { IVoucher } from './IVoucher';

export interface IOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  status: IStatus;
  user: any;
  userGuest?: any;
  address?: IAddress;
  billingAddress?: IAddress;
  shipping?: IShipping;
  payment?: IPayment;
  voucher?: IVoucher;
  productLists: IProductLists[];

}
interface IStatus {
  type: string;
}
export interface IProductLists {
  id: string;
  quantity: number;
  total: number;
  product: IProduct;
}
// interface IProduct {
//   id?: string;
//   name: string;
//   price: number;
//   title: string;
//   vat: number;
//   size: string;
//   assets: string[];
//   description: string;
// }
export interface IShipping {
  shippingPrice: number;
  type: string;
}
