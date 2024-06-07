import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "@/components/CustomTable";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import LogsList from "@/components/LogsList";
// import Spinner from "@/components/Spinner";
import { IReviewSummaryProps } from "./type";

const ReviewSummary = ({ columns, payoutLogsHeader }: IReviewSummaryProps) => {
  // Your existing code here

  return (
    <div className="grid md:grid-cols-7 gap-4 m-5">
      {/* {true ? ( */}
      <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
        <div className="bg-white p-5 pb-0 ">
          <h3 className="text-base font-bold mb-3 tracking-wide">
            Payout Summary
          </h3>
          <LogsList logs={payoutLogsHeader} data={{}} />
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
          <div className="bg-white w-full overflow-x-scroll">
            <CustomTable
              data={[]}
              columns={columns as ColumnDef<{ _id?: string }>[]}
            />
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
