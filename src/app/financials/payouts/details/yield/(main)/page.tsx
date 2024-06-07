"use client";

import React from "react";
import Link from "next/link";
// import { Spinner } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

import LogsList from "@/components/LogsList";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import CustomTable from "@/components/CustomTable";
import { Plus } from "@/utils/icons";
import { COLUMNS, LOGSDATA, LOGSHEADERS } from "../configs";

const RentailYield = () => {
  return (
    <>
      <div className="grid md:grid-cols-7 gap-4 m-5">
        {/* {true ? ( */}
        <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
          {true && (
            <div className="bg-white p-5 pb-0 mb-[140px]">
              <h3 className="text-base font-bold mb-3 tracking-wide">
                Summary
              </h3>
              <LogsList logs={LOGSHEADERS} data={LOGSDATA} />
            </div>
          )}
        </div>
        {/* ) : (
          <Spinner />
        )} */}
        <div className="md:col-start-3 md:col-end-8 flex flex-col gap-4 h-screen">
          <div className="h-full overflow-y-scroll no-scrollbar">
            <div className="flex flex-row items-center justify-between gap-4 w-full mb-5">
              <p className="font-bold flex-shrink-0">Payouts</p>

              <Link
                type="button"
                className="bg-primary text-white text-[14px] px-3 py-2 font-medium animate-fade tracking-wider rounded-sm flex items-center justify-center gap-1"
                href="/financials/payouts/details/yield/create"
              >
                <Plus />
                NEW PAYOUT
              </Link>
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
    </>
  );
};

export default RentailYield;
