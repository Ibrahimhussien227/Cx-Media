import React from "react";

import { TransactionTypeProps } from "./type";
import TransactionTextType from "@/components/TransactionTextType";

const TransactionTypeCell = ({ cell }: TransactionTypeProps) => {
  return <TransactionTextType text={cell.row.original.transactionType} />;
};

export default TransactionTypeCell;
