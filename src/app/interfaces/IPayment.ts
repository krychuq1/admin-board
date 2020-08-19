export interface IPayment {
  paymentId: number;
  customerIp: string;
  currencyCode: string;
  totalAmount: string;
  payMethod: string;
}
