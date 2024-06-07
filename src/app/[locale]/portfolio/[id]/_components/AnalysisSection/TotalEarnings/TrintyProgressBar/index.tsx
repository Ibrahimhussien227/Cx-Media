import React from "react";

import { ITrintyProgressBarProps } from "./type";

const TrintyProgressBar = ({
  rentalYield,
  salePayout,
  transferSale,
}: ITrintyProgressBarProps) => {
  return (
    <div className="relative w-full flex h-[7px] border bg-lightBackground border-[#D4E4F2] rounded-[5px] items-center justify-start ">
      <div
        className={`h-[100%] bg-gradient-to-r sky-prograss-bar`}
        style={{ width: `${rentalYield}%` }}
      />
      <div
        className={`h-[100%] bg-[#9F83FF]`}
        style={{ width: `${salePayout}%` }}
      />
      <div
        className={`h-[100%] bg-gradient-to-l teal-prograss-bar`}
        style={{ width: `${transferSale}%` }}
      />
    </div>
  );
};

export default TrintyProgressBar;
