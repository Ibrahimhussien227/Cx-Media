"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import LogsList from "@/components/LogsList";
import CustomDatePicker from "@/components/CustomDatePicker";

import CustomTable from "@/components/CustomTable";
import { COLUMNS, LOGSDATA, LOGSHEADERS } from "./configs";

const Overview = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  return (
    <div className="grid md:grid-cols-5 gap-4 m-5">
      {/* {true ? ( */}
      <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
        <div className="bg-white p-5 pb-0 mb-[140px]">
          <h3 className="text-base font-bold mb-3 tracking-wide">
            4 Bed Townhouse in Business Bay
          </h3>
          <LogsList logs={LOGSHEADERS} data={LOGSDATA} />
        </div>
      </div>
      {/* ) : (
        <Spinner />
      )} */}
      <div className="md:col-start-3 md:col-end-6 flex flex-col gap-4 h-screen">
        <div className="h-full overflow-y-hidden no-scrollbar">
          <div className="flex flex-row items-center gap-4 w-fit mb-5">
            <p className="font-bold flex-shrink-0">Current Cap Table</p>
            <CustomDatePicker
              className="h-[32px] px-[5px] bg-[#F5F8FF80] max-w-[250px] mt-1"
              icon="CalendarBlank"
              value={params?.get("capDate")}
              formatString="yyyy-MM-dd"
              onChange={(date: string) => {
                params.set("capDate", date);
                router.replace(`${pathname}?${params.toString()}`);
              }}
            />
          </div>
          {/* {false ? (
            <TableSkeleton />
          ) : ( */}
          <div className="bg-white w-full overflow-x-scroll h-full overflow-y-hidden">
            <CustomTable
              data={[]}
              columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
            />
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
