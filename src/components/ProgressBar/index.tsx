import React from "react";

import { IProgressBarProps } from "./type";

const ProgressBar = ({ percent, color }: IProgressBarProps) => {
  return (
    <div className="relative w-full flex h-[7px] border bg-lightBackground border-[#D4E4F2] rounded-[5px] items-center justify-start ">
      <div
        className={`h-[100%] bg-gradient-to-r ${color} rounded-sm`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
