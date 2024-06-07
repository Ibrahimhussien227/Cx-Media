import React from "react";
import DownloadWrapper from "@/components/DownloadWrapper";

const LegalInformation = () => {
  return (
    <div className="flex flex-col w-[100%] ">
      <div className="flex justify-between items-center sm:px-[20px] pt-[5px] pb-[20px] border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] font-MinionPro">
            Review Legal Information.
          </h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            View and download a copy of your legal agreements with WeProperties.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[100%] sm:px-[20px] py-[20px]">
        <div className="flex flex-col sm:w-[400px] full">
          <DownloadWrapper
            value="Share Certificate"
            className="mb-3 w-full"
            colored
            readOnly
            downloadDisabled
          />
          <DownloadWrapper
            value="Share Certificate"
            className="w-full"
            downloadDisabled
            colored
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LegalInformation;
