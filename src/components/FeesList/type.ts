export interface ITransactionListProps {
  data: {
    _id: string;
    data: {
      Amount: string;
      Status: string;
      Timestamp: string;
      PaymentMethod: string;
    };
  }[];
  headers: {
    accessorKey: string;
    header: string;
  }[];
}

export interface IFeeData {
  Amount: string;
  Status: string;
  Timestamp: string;
  PaymentMethod: string;
}
