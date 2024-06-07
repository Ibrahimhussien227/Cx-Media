"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "@/components/CustomTable";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
// import Spinner from "@/components/Spinner";
import LogsList from "@/components/LogsList";
import { ArrowLeft } from "@/utils/icons";
import { COLUMNS, LOGSDATA, LOGSHEADERS } from "./configs";

const PayoutDetails = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="flex flex-row items-center px-5 py-2 mt-5 text-[18px]">
        <Link
          href="."
          className="flex flex-row items-center mr-2 cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2 mt-1" />
          <span className="font-medium text-[#555555]">Payouts |</span>
        </Link>
        <span className="font-bold text-primary tracking-wide">
          {searchParams.get("id")}
        </span>
      </div>

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
            <div className="flex flex-row items-center justify-between gap-4 w-full mb-5">
              <p className="font-bold flex-shrink-0">Distribution Breakdown</p>
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

export default PayoutDetails;
