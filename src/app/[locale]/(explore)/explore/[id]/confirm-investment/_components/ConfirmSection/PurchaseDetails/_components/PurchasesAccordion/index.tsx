"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { CaretDown } from "@/utils/icons";
import { hideDropdown, showDropdown } from "@/utils/motions";
import { purchasesCostList } from "./configs";

const PurchasesAccordion = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-row items-center justify-between w-full">
        {/* accordion head */}
        <div
          className="flex flex-row w-full justify-between items-center gap-5 cursor-pointer relative"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <div className="flex flex-row">
            <p className="text-secondary text-[10px] tracking-[1.5px] font-bold mr-2">
              PROPERTY PURCHASE COSTS
            </p>
            <CaretDown
              weight="bold"
              color="#5A6A93"
              size={14}
              className={`shrink-none ${
                isExpanded ? "rotate-180" : "rotate-0"
              } transition-all`}
            />
          </div>
          <p className="text-[16px] flex tracking-[0px]">
            _
            <span className="flex text-secondary text-[12px] pt-[4px] pl-[5px]">
              AED
            </span>
          </p>
        </div>
      </div>
      <motion.div
        className="w-full hidden overflow-y-scroll no-scrollbar !mt-[1px] mb-2"
        animate={isExpanded ? showDropdown : hideDropdown}
      >
        {purchasesCostList.map((purchase) => (
          <div
            key={purchase.keyAccessor}
            className="w-full flex flex-row justify-between mt-[1px]"
          >
            <p className="text-secondary text-[11px] tracking-[1.5px]">
              {purchase.display}
            </p>
            <p className="text-[16px] flex tracking-[0px]">
              _<span className="flex text-secondary text-[11px]">AED</span>
            </p>
          </div>
        ))}{" "}
      </motion.div>
    </div>
  );
};

export default PurchasesAccordion;
