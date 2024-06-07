"use client";

import CustomTable from "@/components/CustomTable";
import React from "react";
import { IDataCellsPortfolio } from "./type";
import TableRow from "./TableRow";
import { HeadCellPortfolio, data } from "./config";

const TableWrapper = () => {
  return (
    <CustomTable<IDataCellsPortfolio>
      columns={HeadCellPortfolio}
      data={data}
      sortable
    >
      {(row: IDataCellsPortfolio) => <TableRow data={row} />}
    </CustomTable>
  );
};

export default TableWrapper;
