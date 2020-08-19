export interface IAddress {
  id?: string;
  name: string;
  surname: string;
  phoneNumber: string;
  street: string;
  building: string;
  flat: string;
  isShippingDefault?: boolean;
  isBillingDefault?: boolean;
  lastShippingUsed?: boolean;
  lastBillingUsed?: boolean;
  zipCode: string;
  city: string;
  country?: string;

}
