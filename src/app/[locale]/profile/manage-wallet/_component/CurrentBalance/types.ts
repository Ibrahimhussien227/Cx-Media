

export interface IWalletSectionProps {
  customerId: string;
  paymentMethods: IPaymentMethod[];
  revalidatePaymentMethods: () => Promise<void>;
  wallet?: IWallet
  revalidateWallet: () => Promise<void>;
  revalidateTransactions: () => Promise<void>;
}