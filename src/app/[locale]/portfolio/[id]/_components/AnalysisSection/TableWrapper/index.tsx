"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";
import { IDataCellsSpecificPortfolio } from "./type";
import TableRow from "./TableRow";
import { HeadCellSpecificPortfolio, data } from "./config";

const TableWrapper = () => {
  return (
    <CustomTable<IDataCellsSpecificPortfolio>
      columns={HeadCellSpecificPortfolio}
      data={data}
    >
      {(row: IDataCellsSpecificPortfolio) => <TableRow data={row} />}
    </CustomTable>
  );
};

export default TableWrapper;
