

export interface IAccountsSectionProps {
  customerId: string,
  paymentMethods: IPaymentMethod[],
  revalidatePaymentMethods: ()=> Promise<void>
}