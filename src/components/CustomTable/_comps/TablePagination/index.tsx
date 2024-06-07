import Link from "next/link";

import { DownloadSimple } from "@/utils/icons";
import DebouncedInput from "@/components/DebouncedInput";
import { ITablePaginationProps } from "./type";
import { useSearchParams } from "next/navigation";

const TablePagination = <T,>({
  table,
  tableCount,
}: ITablePaginationProps<T>) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const totalPages = table.getPageCount();

  // Calculate the range of pages to display based on the current page
  const pageRangeStart = Math.max(1, currentPage - 1);
  const pageRangeEnd = Math.min(totalPages, currentPage + 1);

  const pageNumbers = Array.from(
    { length: pageRangeEnd - pageRangeStart + 1 },
    (_, i) => pageRangeStart + i
  );

  const params: { [key: string]: string } = {};

  for (const [key, value] of Array.from(searchParams.entries())) {
    params[key] = value;
  }

  return (
    <div className="flex flex-row items-center justify-between py-4 px-4">
      <p className="text-[12px] text-secondary font-light">
        Showing{" "}
        <span className="font-extrabold">1-{table.options.data.length}</span> of{" "}
        <span className="font-extrabold">{tableCount} items.</span>
      </p>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-between gap-4">
          <button className="bg-primary flex flex-row items-center justify-center text-white rounded-md px-2 py-1 gap-1 text-center">
            <DownloadSimple />
            <p className="text-[10px] font-bold tracking-[1.8px]">DOWNLOAD</p>
          </button>
          <div className="flex flex-row border rounded-sm text-[11px] justify-center items-center w-[70xp] h-[25px]">
            <button
              className="h-full w-full bg-[#F5F8FF80] font-medium border-r rounded-sm px-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <p>Previous</p>
            </button>
            {pageNumbers.map((number) => (
              <Link
                href={{
                  query: {
                    ...params,
                    page: number,
                  },
                }}
                key={number}
                className={`px-3 py-1 h-full hover:bg-gradient-blue-white border ${
                  Number(searchParams?.get("page")) === number
                    ? "border-secondary"
                    : "border-[#FFFFFF] border-r-[#D4E4F2]"
                } hover:border-secondary cursor-pointer`}
              >
                <p>{number}</p>
              </Link>
            ))}

            <button
              className="h-full w-full bg-[#F5F8FF80] font-medium rounded-sm px-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <p>Next</p>
            </button>
          </div>
        </div>
        <DebouncedInput
          value={searchParams?.get("page") || 1}
          searchKey={"page"}
          placeholder="Go to page"
        />
      </div>
    </div>
  );
};

export default TablePagination;
