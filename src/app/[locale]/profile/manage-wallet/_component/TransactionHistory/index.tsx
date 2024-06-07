"use client";

import { LIST, LISTPERIOD } from "./config";
import CustomSelect from "@/components/CustomSelect";
import React from "react";

import CustomTable from "@/components/CustomTable";
import TableRow from "./TableRow";
import { HeadCellTransaction } from "./config";

import FileDownloader from "@/components/FileDownloader";

const TransactionHistory = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  return (
    <div className="flex w-full sm:border-l-[1px] border-[#D4E4F2] sm:pl-[25px] items-start flex-col h-full overflow-hidden">
      <div className="flex justify-between w-full">
        <h2 className="flex  text-[20px]">Transaction History.</h2>
        <div className="flex justify-center items-center bg-white border rounded-full w-[25px] h-[25px]">
          <FileDownloader filePath="" />
        </div>
      </div>
      <div className="flex w-full mt-5 flex-row justify-between">
        <div className="flex flex-row w-full">
          <p className="text-secondary text-[10px] border border-r-[0px] h-full text-center px-2 flex items-center justify-center bg-white font-bold">
            TYPE
          </p>
          <CustomSelect className="w-[80%]" value={LIST[0]} options={LIST} />
        </div>
        <div className="flex flex-row w-full">
          <p className="text-secondary text-[10px] border border-r-[0px] h-full text-center px-2 flex items-center justify-center bg-white font-bold">
            PERIOD
          </p>
          <CustomSelect
            className="w-[80%]"
            value={LISTPERIOD[0]}
            options={LISTPERIOD}
          />
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <CustomTable<ITransaction>
          columns={HeadCellTransaction}
          data={transactions}
          sortable
        >
          {(row: ITransaction) => <TableRow data={row} />}
        </CustomTable>
      </div>
    </div>
  );
};

export default TransactionHistory;
