"use client";

import React from "react";
// import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import LogsList from "@/components/LogsList";
import CustomTable from "@/components/CustomTable";

import { LOGSDATA, LOGSHEADERS } from "../configs";
import { COLUMNS } from "../configs";

const PropertySale = () => {
  return (
    <>
      {/* {false ? ( */}
      <div className="grid md:grid-cols-7 gap-4 m-5">
        {/* {true ? ( */}
        <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
          <div className="bg-white p-5 pb-0 mb-[140px]">
            <h3 className="text-base font-bold mb-3 tracking-wide">
              Payout Summary
            </h3>
            <LogsList logs={LOGSHEADERS} data={LOGSDATA} />
          </div>
        </div>
        {/* ) : (
            <Spinner />
          )} */}
        <div className="md:col-start-3 md:col-end-8 flex flex-col gap-4 h-screen">
          <div className="h-full overflow-y-scroll no-scrollbar">
            <div className="flex flex-row items-center justify-between gap-4 w-full mb-5 pt-2 pb-[5px]">
              <p className="font-bold flex-shrink-0">Distribution Breakdown</p>
            </div>
            {/* {false ? (
                <TableSkeleton />
              ) : ( */}
            <div className="bg-white w-full overflow-x-scroll">
              <CustomTable
                data={[]}
                columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
              />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="h-svh flex flex-col items-center justify-center border">
          <p className="font-bold text-[#555555] -mt-[200px] mb-5">
            No Payout is created for this property.
          </p>
          <Link
            href="/financials/payouts/details/sale/create"
            className="bg-primary text-white text-[14px] px-3 py-2 font-medium animate-fade tracking-wider rounded-sm flex items-center justify-center gap-1"
          >
            <Plus />
            CREATE PAYOUT
          </Link>
        </div>
      )} */}
    </>
  );
};

export default PropertySale;
