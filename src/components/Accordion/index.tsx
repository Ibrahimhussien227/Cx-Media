"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { hideDropdown, showDropdown } from "@/utils/motions";
import { Minus, Plus } from "@/utils/icons";
import { AccordionProps } from "./type";

const AccordionComponent = ({
  title,
  className,
  children,
  startExpanded = false,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(startExpanded);

  return (
    <div className={`w-full flex flex-col items-center ${className} mt-4`}>
      <div className="flex flex-row items-center justify-between w-full px-2 py-3 bg-white border">
        {/* accordion head */}
        <div
          className="flex flex-row w-full justify-between items-center cursor-pointer mx-3 relative"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <h3 className="font-minion">{title}</h3>
          {/* Flat Div */}
          <div
            className={`bg-active text-[white] w-[12px] h-[2px] bottom-[-13px]
            } left-[3px] absolute ${isExpanded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="flex flex-row gap-4 transition-all border rounded-full px-1 py-1 text-active">
            {isExpanded ? (
              <Minus weight="bold" size={14} className="transition-all" />
            ) : (
              <Plus weight="bold" size={14} className="transition-all" />
            )}
          </div>
        </div>
      </div>
      <motion.div
        className="w-full px-5 hidden overflow-y-scroll no-scrollbar bg-white border border-t-[0px]"
        animate={isExpanded ? showDropdown : hideDropdown}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AccordionComponent;
