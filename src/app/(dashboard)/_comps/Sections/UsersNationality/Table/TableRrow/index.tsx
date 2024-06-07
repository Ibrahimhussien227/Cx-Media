import React from "react";
import { ITableRowProps } from "./type";

const TableRow = ({ data, index }: ITableRowProps) => {
  return (
    <tr className={"text-left text-sm" + (index % 2 === 0 && "bg-[#F5F8FF80]")}>
      <td className="px-5 pt-3">{data.id}.</td>
      <td className="px-5">{data.nationality}.</td>
      <td className="px-5">{data.totalUsers}.</td>
    </tr>
  );
};

export default TableRow;
