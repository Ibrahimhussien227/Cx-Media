export interface IInvestmentCard {
  className?: string;
  title?: string;
  amount?: number;
  date?: string;
  data: {
    [key: string]: {
      label: string;
      value: string;
      reddish?: boolean;
    };
  };
  children?: React.ReactNode;
  transactionID?: string;
}
