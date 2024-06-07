import LinkCell from "@/components/CustomTable/_comps/LinkCell";
import StatusCell from "@/components/CustomTable/_comps/StatusCell";
import TransactionTypeCell from "@/components/CustomTable/_comps/TransactionTypeCell";

export const STATUSOPTIONS = {
  transactionStatus: [
    { value: "COMPLETE", display: "COMPLETE" },
    { value: "PROCESSING", display: "PROCESSING" },
    { value: "FAILED", display: "FAILED" },
  ],
};

export const TABOPTIONS: IOption[] = [
  {
    display: "Payments",
    value: "payment",
  },
  {
    display: "In-App Transactions",
    value: "in-app-transactions",
  },
];

export const STATSARRAY = [
  {
    title: "Total Transactions",
    icon: "",
    count: "175974",
  },
  {
    title: "Total Payments",
    icon: "",

    count: "213865",
  },
  {
    title: "Total In-App Transactions",
    icon: "",

    count: "15854",
  },
  {
    title: "Platform Earnings",
    icon: "",

    count: "5135",
  },
];

export const DATA = [
  {
    transactionId: "transactionId",
    accountID: "transactionId",
    accountType: "Investor",
    transactionAmount: "434542",
    transactionPurpose: "Deposit",
    transactionStatus: "COMPLETE",
    transactionType: "Credit",
    paymentMethod: "** Visa",
    receiptLink: { href: "sasd", title: "link" },
    investorId: "",
    sellerId: "",
    transactionTime: "r",
  },
  {
    transactionId: "transactionId",
    accountID: "transactionId",
    accountType: "Investor",
    transactionAmount: "434542",
    transactionPurpose: "Deposit",
    transactionStatus: "PROCESSING",
    transactionType: "Debit",
    paymentMethod: "** Visa",
    receiptLink: { href: "sasd", title: "link" },
    investorId: "",
    sellerId: "",
    transactionTime: "r",
  },
  {
    transactionId: "transactionId",
    accountID: "transactionId",
    accountType: "Investor",
    transactionAmount: "434542",
    transactionPurpose: "Deposit",
    transactionStatus: "FAILED",
    transactionType: "Credit",
    paymentMethod: "** Visa",
    receiptLink: { href: "sasd", title: "link" },
    investorId: "",
    sellerId: "",
    transactionTime: "r",
  },
];

export const COLUMNS = [
  {
    id: "transactionId",
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    id: "accountID",
    accessorKey: "accountID",
    header: "Account ID",
  },
  {
    id: "accountType",
    accessorKey: "accountType",
    header: "Account Type",
  },
  {
    id: "transactionAmount",
    accessorKey: "transactionAmount",
    header: "Transaction Amount",
  },
  {
    id: "transactionPurpose",
    accessorKey: "transactionPurpose",
    header: "Transaction Purpose",
  },
  {
    id: "transactionStatus",
    type: "select",
    accessorKey: "transactionStatus",
    header: "Transaction Status",
    cell: StatusCell,
  },
  {
    id: "transactionType",
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: TransactionTypeCell,
  },

  {
    id: "paymentMethod",
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    id: "receiptLink",
    accessorKey: "receiptLink",
    header: "Receipt Link",
    cell: LinkCell,
  },
  {
    id: "investorId",
    accessorKey: "investorId",
    header: "Investor ID",
  },
  {
    id: "sellerId",
    accessorKey: "sellerId",
    header: "Seller Id",
  },
  {
    id: "transactionTime",
    type: "date",
    accessorKey: "transactionTime",
    header: "Transaction Time",
  },
];
