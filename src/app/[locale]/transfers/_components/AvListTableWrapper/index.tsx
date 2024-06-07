"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";
import TableWarning from "@/components/TableWarning";
import { IDataCellsTransfers } from "./type";
import TableRow from "./TableRow";
import { HeadCellTransfers, data } from "./configs";

const AvListTableWrapper = () => {
  return (
    <>
      <TableWarning
        text="Transfers Open from 23 March, 2024 to 23 April, 2024."
        className="border-[#009DFF] text-[#009DFF] bg-[#F5FAFF]"
      />
      <CustomTable<IDataCellsTransfers> columns={HeadCellTransfers} data={data}>
        {(row: IDataCellsTransfers) => <TableRow data={row} />}
      </CustomTable>
    </>
  );
};

export default AvListTableWrapper;
