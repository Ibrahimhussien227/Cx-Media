"use client";

import React, { useState } from "react";

import { IExpandTextProps } from "./type";

const ExpandText = ({ assetDescription }: IExpandTextProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4 items-start">
      <p className="font-MinionPro text-[18px] mb-1">Overview.</p>
      <p className="text-secondary text-[12px] tracking-[0]">
        {/* {assetDescription} */}
        {showMore ? assetDescription : assetDescription.substring(0, 515)}
      </p>

      {!showMore ? (
        <button
          className="font-productSan text-[12px] mt-4 text-active "
          onClick={() => setShowMore(true)}
        >
          Read More +
        </button>
      ) : (
        <button
          className="font-productSan text-[12px] mt-4 text-active"
          onClick={() => setShowMore(false)}
        >
          Hide -
        </button>
      )}
    </div>
  );
};

export default ExpandText;
