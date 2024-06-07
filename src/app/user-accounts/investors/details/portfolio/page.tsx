"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

// import TableSkeleton from "@/components/Skeleton/Table";
import CustomTable from "@/components/CustomTable";
// import Spinner from "@/components/Spinner";
import CreateModal from "./_comps/CreateModal";
import { COLUMNS } from "./config";

const Portfolio = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {/* {true ? ( */}
      <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
        <div className="bg-white p-5 mb-[140px]">
          <p className="font-medium">Total Earnings</p>
          <h3 className="text-[28px] font-bold mb-3 tracking-wide">
            1,94,34,542 AED
          </h3>
          <ul>
            <li className="flex gap-2 justify-between pb-4 pt-4 border-t border-gray-200">
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                Rental Yield Earnings
              </span>
              <span className="font-medium text-[12px] text-primary">
                4,34,542 AED
              </span>
            </li>
          </ul>
          <ul>
            <li className="flex gap-2 justify-between pb-4 pt-4 border-t border-gray-200">
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                Property Sale Payouts
              </span>
              <span className="font-medium text-[12px] text-primary">
                23,12,353 AED
              </span>
            </li>
          </ul>
          <ul>
            <li className="flex gap-2 justify-between pt-4 border-t border-gray-200">
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                Share Transfer Sales
              </span>
              <span className="font-medium text-[12px] text-primary">
                23,12,353 AED
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* ) : (
        <Spinner />
      )} */}
      <div className="md:col-start-3 md:col-end-6 flex flex-col gap-4 h-screen">
        <div className="h-full overflow-y-scroll no-scrollbar">
          <div className="mb-5 py-1">
            <p className="text-[18px] font-bold tracking-wide">
              Portfolio Holdings
            </p>
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
      {/* MODALS */}
      {showModal && <CreateModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Portfolio;
