"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";
import { ITableWrapperProps } from "./type";
import { HeadCellCampaigns } from "./config";
import TableRow from "./TableRow";
import { campaigns } from "../../config";
import LoadMore from "../LoadMore";
import { IDataCellsCampaigns } from "../../type";

const TableWrapper = ({
  data,
  searchParams,
}: ITableWrapperProps & ISearchParamsProps) => {
  return (
    <CustomTable<IDataCellsCampaigns["data"]>
      columns={HeadCellCampaigns}
      data={campaigns(data)}
      loadMore={<LoadMore searchParams={searchParams} />}
    >
      {(row: IDataCellsCampaigns["data"]) => <TableRow data={row} />}
    </CustomTable>
  );
};

export default TableWrapper;
