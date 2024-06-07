"use client";

import React, { useCallback, useMemo, useState } from "react";

import { Sort } from "@/utils/icons";
import { ICustomTableProps, ISort } from "./type";

const CustomTable = <T,>({
  columns,
  data,
  children,
  sortable = false,
  loadMore,
}: ICustomTableProps<T>) => {
  const [sort, setSort] = useState<ISort>({
    keyToSort: columns[0].key,
    direction: "desc",
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
    [sort.direction, sort.keyToSort]
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
    <div className="overflow-y-hidden">
      <table className="table-auto border-separate border-spacing-y-[1rem] z-0 overflow-visible w-full">
        <thead>
          <tr className="bg-white w-full ">
            {columns.map((header, index) => (
              <th
                key={index}
                onClick={() => sortable && handleHeaderClick(header)}
                className={`${sortable && "cursor-pointer"} py-3`}
              >
                <div className="flex flex-row items-center gap-1 px-4">
                  <p className="text-[10px] text-secondary font-bold">
                    {header.label}
                  </p>
                  {sortable && <Sort size={10} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortable
            ? sortedData.map((row, index) => (
                <React.Fragment key={index}>{children(row)}</React.Fragment>
              ))
            : data.map((row, index) => (
                <React.Fragment key={index}>{children(row)}</React.Fragment>
              ))}
          {loadMore}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
