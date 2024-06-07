"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";
import TableWarning from "@/components/TableWarning";
import TotalEarningProgressBar from "@/components/TotalEarningProgressBar";
import { DownloadSimple } from "@/utils/icons";
import TableRow from "./TableRow";
import { HeadCellTransfers, data, TotalEarningsData } from "./configs";
import { IDataCellsTransfers } from "./type";

const MyListTableWrapper = () => {
  return (
    <>
      <div className="flex flex-col px-[20px] py-[10px] mr-[5px] min-w-[23%] border-r-[1px]">
        <div className="flex w-[100%] flex-col px-[20px] py-[10x] mr-[5px]">
          <div className="flex flex-col">
            <p className=" text-[10px] font-bold">SHARE TRANSFER EARNINGS</p>
            <p className=" text-[26px] font-MinionPro">
              13,050.45
              <span className="text-secondary text-[20px] pl-[5px]">AED</span>
            </p>
            <div>
              <p className=" text-[10px] font-bold mt-3">MY LISTINGS</p>
              <p className=" text-[26px] font-MinionPro">13</p>
            </div>
            <TotalEarningProgressBar
              data={TotalEarningsData.one}
              color="text-[#009DFF]"
              barColor="sky-prograss-bar"
            />
            <TotalEarningProgressBar
              data={TotalEarningsData.two}
              color="text-[#FFBA00]"
              barColor="yellow-prograss-bar"
            />
            <TotalEarningProgressBar
              data={TotalEarningsData.three}
              color="text-[#00B8BF]"
              barColor="teal-prograss-bar"
            />
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="flex w-full border-[#D4E4F2] sm:pl-5 flex-col">
        <div className="flex justify-between w-full sm:pr-5">
          <h2 className="flex text-[20px]">My Listings</h2>

          <div className="px-1 py-1 border bg-white rounded-full place-self-center">
            <DownloadSimple size={14} />
          </div>
        </div>
        <TableWarning
          text="Transfer Window Closed"
          className="text-[#FF5A5A] border-[#FF5A5A] bg-[#FFF4F4] mt-2"
        />
        <CustomTable<IDataCellsTransfers>
          columns={HeadCellTransfers}
          data={data}
        >
          {(row: IDataCellsTransfers) => <TableRow data={row} />}
        </CustomTable>{" "}
      </div>
    </>
  );
};

export default MyListTableWrapper;
