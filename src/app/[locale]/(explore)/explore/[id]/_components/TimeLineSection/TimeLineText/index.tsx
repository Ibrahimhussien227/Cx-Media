import React from "react";

import { ITimeLineTextProps } from "./type";

const TimeLineText = ({ title, date }: ITimeLineTextProps) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full ">
        <div className="flex font-MinionPro text-[18px] items-center">
          <div className="border-[1px] border-[#FF6C02] bg-white rounded-[6px] flex w-[12px] mr-[10px]">
            <span className="rounded-[5px] border-[1px] border-[#ffffff] b bg-[#FF6C02] flex w-[10px] h-[10px]" />
          </div>
          <p className="w-full">{title}</p>
        </div>

        <p className="flex text-secondary text-[12px] font-bold">{date}</p>
      </div>
      <span className="gradient-orange flex w-[3px] h-[40px] relative top-[-7px] ml-[4px]" />
    </>
  );
};
TimeLineText;

export default TimeLineText;
