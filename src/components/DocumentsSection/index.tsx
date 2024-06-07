import React from "react";
import DownloadWrapper from "../DownloadWrapper";

const DocumentsSection = () => {
  return (
    <section className="relative flex flex-col w-full bg-gradient-to-b from-white to-[#FFFAF8] p-5">
      <div className="absolute w-[2px] h-3 bg-active left-[-1px] top-5" />

      <div className="flex flex-col w-full">
        <h2 className="text-secondary text-[10px] font-bold tracking-[1.5px] mb-2">
          DOCUMENTS
        </h2>
        <div className="flex flex-col w-full ">
          <p className="font-MinionPro text-[18px] mb-1">
            Commercial and Legal Documents.
          </p>
          <div className="flex flex-col">
            <DownloadWrapper
              value="Share Certificate"
              className="mb-2 w-full"
              colored
              readOnly
            />
            <DownloadWrapper
              value="Title Dead"
              className="w-full"
              colored
              readOnly
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
