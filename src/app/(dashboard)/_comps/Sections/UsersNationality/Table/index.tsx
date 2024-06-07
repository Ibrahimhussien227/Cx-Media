"use client";

import React, { useCallback, useMemo, useState } from "react";

import { Sort } from "@/utils/icons";
import { ICustomTableProps, ISort } from "./type";
import TableRow from "./TableRrow";

const CustomTable = <
  T extends { id: number; nationality: string; totalUsers: number },
>({
  columns,
  data,
}: ICustomTableProps<T>) => {
  const [sort, setSort] = useState<ISort>({
    keyToSort: columns[0].key,
    direction: "asc",
  });

  const getSortedArray = useCallback(
    (arrayToSort: T[]) => {
      return arrayToSort.sort((a, b) => {
        if (sort.direction === "asc") {
          return (a[sort.keyToSort as keyof T] as string) >
            (b[sort.keyToSort as keyof T] as string)
            ? 1
            : -1;
        }
        return (a[sort.keyToSort as keyof T] as string) <
          (b[sort.keyToSort as keyof T] as string)
          ? 1
          : -1;
      });
    },
    [sort.direction, sort.keyToSort],
  );

  const sortedData = useMemo(() => {
    return getSortedArray(data);
  }, [data, getSortedArray]);

  const handleHeaderClick = (header: { key: string; label: string }) => {
    setSort((prevSort) => ({
      keyToSort: header.key,
      direction:
        header.key === prevSort.keyToSort && prevSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <table className="relative w-full max-w-full max-h-full overflow-auto table-auto">
      <thead className="border border-secondary/[0.05] sticky top-0 bg-white">
        <tr className=" w-full justify-between">
          {columns.map((header, index) => (
            <th
              key={index}
              onClick={() => handleHeaderClick(header)}
              className=" py-1 font-semibold text-black"
            >
              <div className="flex flex-row items-center gap-1 px-4">
                <p className="text-[10px] text-secondary font-bold">
                  {header.label}
                </p>
                <Sort size={10} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <TableRow key={index} data={row} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
