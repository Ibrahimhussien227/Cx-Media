import React from "react";

import { ProgressBarProps } from "./type";

const ProgressBar = ({ percent, color }: ProgressBarProps) => {
  return (
    <div className=" w-full flex h-[8px] border bg-[#F5FAFF] border-[#F5FAFF] rounded-[8px]  items-center justify-start ">
      <div
        className={`h-[100%] bg-gradient-to-l ${color} rounded-[8px]`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
