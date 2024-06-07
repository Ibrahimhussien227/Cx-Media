import React from "react";
import Link from "next/link";

import PropertyDetailSection from "./_components/PropertyDetailsSection";
import AnalysisSection from "./_components/AnalysisSection";
import { ArrowLeft } from "@/utils/icons";

const PortfolioDetails = ({ searchParams }: ISearchParamsProps) => {
  return (
    <div className="w-full overflow-scroll scroll-smooth no-scrollbar lg:h-screen lg:overflow-hidden">
      <div className="flex w-full h-[70px] border-b-[1px] flex-row items-center justify-start">
        <Link
          href="."
          className="flex flex-row w-fit items-center justify-start h-full text-[10px] font-bold ]  px-10"
        >
          <div className="flex flex-row items-center justify-start gap-2 tracking-[0px]">
            <ArrowLeft size={20} />

            <p className="text-secondary font-bold uppercase">PORTFOLIO</p>
            <p className="mr-2 ml-2 text-secondary">|</p>
            <p className=" text-[10px]">5 BED VILLA IN GARDENS</p>
          </div>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center lg:items-start lg:flex-row px-[40px] py-[20px] h-full">
        <PropertyDetailSection searchParams={searchParams} />
        <AnalysisSection />
      </div>
    </div>
  );
};

export default PortfolioDetails;
