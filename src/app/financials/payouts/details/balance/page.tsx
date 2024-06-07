"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
// import Spinner from "@/components/Spinner";
import { Plus } from "@/utils/icons";
import CreateModal from "./_components/CreateModal";
import { COLUMNS } from "./configs";

const AccountBalance = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid md:grid-cols-5 gap-4 m-5">
      {/* {true ? ( */}
      <div className=" md:col-start-1 md:col-end-3 h-screen overflow-y-scroll no-scrollbar">
        <div className="bg-white p-5 mb-[140px]">
          <p>Available Balance</p>
          <h3 className="text-[28px] font-bold mb-3 tracking-wide">
            1,94,34,542 AED
          </h3>
          <ul>
            <li className="flex gap-2 justify-between pb-4 pt-4 border-t border-gray-200">
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                Totale Rental Yield Paid Out
              </span>
              <span className="font-medium text-[12px] text-primary">
                4,34,542 AED
              </span>
            </li>
          </ul>
          <ul>
            <li className="flex gap-2 justify-between pb-4 pt-4 border-t border-b border-gray-200">
              <span className="font-medium text-[13px] text-[#333333] tracking-wide">
                Totale Property Sale Payout
              </span>
              <span className="font-medium text-[12px] text-primary">
                23,12,353 AED
              </span>
            </li>
          </ul>

          <CustomButton
            type="button"
            className="bg-primary text-white text-[14px] px-3 py-2 font-medium animate-fade tracking-wider rounded-sm flex items-center justify-center mt-4 w-full"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            DEPOSIT AMOUNT
          </CustomButton>
        </div>
      </div>
      {/* ) : (
        <Spinner />
      )} */}
      <div className="md:col-start-3 md:col-end-6 flex flex-col gap-4 h-screen">
        <div className="h-full overflow-y-scroll no-scrollbar">
          <div className="mb-5 py-1">
            <p className="font-bold flex-shrink-0">Deposit History</p>
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

export default AccountBalance;
