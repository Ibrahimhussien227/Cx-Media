import React from "react";

import LineChart from "@/components/LineChart";
import TotalEarningsSection from "./TotalEarnings";
import PropertySalePayout from "./PropertySalePayout";
import StatsCard from "./StatsCard";
import TableWrapper from "./TableWrapper";
import { chartData } from "./config";
import ShareTransferEarnings from "./ShareTransferEarnings";
import FileDownloader from "@/components/FileDownloader";

const AnalysisSection = () => {
  return (
    <div className="flex w-full lg:w-[calc(100%-260px)] h-full flex-col lg:border-l-[1px] border-[#d4e4f285] lg:pl-[30px]">
      <TotalEarningsSection />
      <div className="flex flex-col w-full h-full lg:overflow-scroll lg:no-scrollbar">
        <PropertySalePayout />
        <div className="flex justify-between items-center w-full my-5">
          <h2 className="flex text-[18px] font-MinionPro ">
            Rental Yield Breakdown.
          </h2>
          <div className="flex justify-center items-center bg-white border rounded-full w-[25px] h-[25px]">
            <FileDownloader filePath="" />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row w-full gap-2">
          <StatsCard title="TOTAL RENTAL YIELD" amount="4,050,45" />
          <StatsCard title="LAST PAYOUT AMOUNT" amount="145.45" />
          <StatsCard title="NEXT PAYOUT DUE" amount="1jan,2024" />
        </div>
        {/* Chart */}
        <div className="relative flex flex-row items-center lg:max-w-[80%] min-h-[280px] my-[20px]">
          <LineChart data={chartData} legendY="AMOUNT (AED)" />
        </div>
        <div className="relative lg:pb-[50x]">
          <TableWrapper />
        </div>
        <ShareTransferEarnings />
      </div>
    </div>
  );
};

export default AnalysisSection;
