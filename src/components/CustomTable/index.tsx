import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PaginationState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowsDownUp } from "@/utils/icons";
import DebouncedInput from "../DebouncedInput";
import { CustomTableProps } from "./type";
import Sort from "./_comps/Sort";
import CustomSelect from "../CustomSelect";
import TablePagination from "./_comps/TablePagination";
import CustomDatePicker from "../CustomDatePicker";

const CustomTable = <T extends { _id?: string }>({
  data,
  columns,
  // searchParams,
  statusOptions,
  tableCount,
  setShowModal,
  hrefDetails = "details",
  disabledRedict,
}: CustomTableProps<T>) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const page = params?.get("page") ?? "1"; // default is page: 1
  const perPage = params?.get("per_page") ?? "10"; // default 10 record per page

  const calculatePageCount = (totalItems: number): number =>
    Math.ceil(totalItems / 10);

  const createQueryString = useCallback(
    (paramsObj: Record<string, string | number | null>) => {
      for (const [key, value] of Object.entries(paramsObj)) {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      return params.toString();
    },
    [params],
  );

  // handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(page) - 1,
    pageSize: Number(perPage),
  });

  const pagination = {
    pageIndex: Number(page) - 1,
    pageSize: Number(perPage),
  };

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const table = useReactTable<T>({
    data,
    columns,
    pageCount: tableCount ? calculatePageCount(tableCount) : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  } as TableOptions<T>);

  return (
    <>
      <div className="bg-white w-full flex-shrink overflow-x-scroll h-full min-h-96">
        <table className="w-full default-custom-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="p-4 pb-0" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div className="flex flex-col items-start justify-center gap-1">
                        {/* the head title with up/down arrow */}
                        <div className="flex flex-row items-center justify-between min-w-[180px] pr-1">
                          {/* title */}
                          <p className="font-bold text-sm capitalize pl-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </p>
                          {/* arrow */}
                          <ArrowsDownUp weight="bold" size={16} />
                        </div>

                        {/* choosing the type of input to place in the header */}
                        <div className="flex flex-row items-center justify-start gap-1">
                          {"type" in header.column.columnDef &&
                          header.column.columnDef.type === "select" ? (
                            statusOptions && (
                              <CustomSelect
                                className="w-[150px] bg-white"
                                value={
                                  statusOptions[header.id]?.find(
                                    (level) =>
                                      level.value ===
                                      searchParams?.get(header.id),
                                  )?.value
                                }
                                options={statusOptions[header.id]}
                                onChange={(selectedRole) => {
                                  const { value } = selectedRole;
                                  params.set(header.id, value);
                                  router.replace(
                                    `${pathname}?${params.toString()}`,
                                  );
                                }}
                              />
                            )
                          ) : "type" in header.column.columnDef &&
                            header.column.columnDef.type === "date" ? (
                            <CustomDatePicker
                              className="h-7 max-w-[150px] px-2 mt-1 bg-white"
                              value={params?.get(header.id)}
                              formatString="yyyy-MM-dd"
                              onChange={(date: string) => {
                                params.set(header.id, date);
                                router.replace(
                                  `${pathname}?${params.toString()}`,
                                );
                              }}
                            />
                          ) : (
                            <DebouncedInput
                              value={searchParams?.get(header.id) || ""}
                              searchKey={header.id}
                            />
                          )}

                          <Sort filterKey={header.id} />
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.original._id}
                onClick={() => {
                  if (setShowModal) {
                    params.set("transactionId", row.original._id ?? "");
                    router.replace(`${pathname}?${params.toString()}`);
                    setShowModal(true);
                  } else {
                    router.push(
                      pathname + `/${hrefDetails}?id=` + row.original._id,
                    );
                  }
                }}
                className={`${
                  disabledRedict ? "cursor-not-allowed" : "cursor-pointer"
                } ${i % 2 === 1 && "bg-[#F5F8FF]"} h-14 px-10`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-[12px] font-normal text-neutral-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination table={table} tableCount={tableCount} />
    </>
  );
};

export default CustomTable;
