"use client";

import React, { useEffect, useState } from "react";

import { ArrowsCounterClockwise } from "@/utils/icons";
import { moneyFormatter } from "@/utils/fromatNumber";
import RangeSlider from "@/components/RangeSlider";
import ChartSection from "./_components/ChartSection";

const InvestmentCalculatorSection = () => {
  const [ROI, setROI] = useState<string>("0");
  const [invested, setInvested] = useState<string>("20000");
  const [rental, setRental] = useState<string>("5");
  const [appreciation, setAppreciaction] = useState<string>("6.5");

  useEffect(() => {
    const updatedROI =
      +invested +
      +invested * (+rental / 100) * 5 +
      +invested * (+appreciation / 100);
    setROI(updatedROI.toString());
  }, [invested, rental, appreciation]);

  const reset = () => {
    setInvested("20000");
    setRental("5");
    setAppreciaction("6.5");
  };

  return (
    <section className="relative flex flex-col w-full bg-gradient-to-b from-white to-[#FFFAF8] p-5">
      <div className="absolute w-[2px] h-3 bg-active left-[-1px] top-5" />
      <p className="text-secondary text-[10px] font-bold">
        INVESTMENT CALCULATOR
      </p>
      <div className="flex w-full justify-between lg:flex-row flex-col">
        {/* Sliders */}
        <div className="flex lg:w-[45%] w-[100%] flex-col pr-3">
          <p className="font-MinionPro text-[20px] mb-3">
            Your potential ROI in 5 years should be{" "}
            {moneyFormatter.format(+ROI)}
            <span className="text-secondary text-[14px] font-MinionPro">
              {" "}
              AED
            </span>
          </p>
          <RangeSlider
            title="YOUR INVESTMENT"
            value={invested}
            min={10000}
            max={200000}
            step={1000}
            color="orange-prograss-bar"
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInvested(e.target.value);
            }}
          >
            <span className="text-[#93A0C3] text-[12px] font-MinionPro">
              AED
            </span>
          </RangeSlider>
          <RangeSlider
            title="EST. RENTAL YIELD"
            value={rental}
            min={0}
            max={100}
            step={1}
            color="sky-prograss-bar"
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRental(e.target.value);
            }}
          >
            <span className="text-[#93A0C3] text-[12px] font-MinionPro">
              % (per year)
            </span>
          </RangeSlider>
          <RangeSlider
            title="EST. APPRECIATION"
            value={appreciation}
            min={0}
            max={100}
            step={0.5}
            color="violet-prograss-bar"
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAppreciaction(e.target.value);
            }}
          >
            <span className="text-[#93A0C3] text-[12px] font-MinionPro">
              % (5 years)
            </span>
          </RangeSlider>
          {/* Reset */}
          <div className="flex flex-row border-[1px] p-3 bg-white opacity-[0.5] mt-3 items-center">
            <div className="flex flex-col">
              <h3 className="font-bold text-[10px] tracking-[1.5px]  mb-1">
                RESET TO DEFAULT
              </h3>
              <p className="text-secondary text-[12px] tracking-[0]">
                Defaults are based on the prevailing valuation at the time of
                funding.
              </p>
            </div>
            <button
              type="button"
              className="bg-white border rounded-full flex felx-row justify-center items-center h-8 w-8 cursor-pointer"
              onClick={() => reset()}
            >
              <ArrowsCounterClockwise size={18} />
            </button>
          </div>
        </div>
        {/* Chart section */}
        <ChartSection />
      </div>
    </section>
  );
};

export default InvestmentCalculatorSection;
