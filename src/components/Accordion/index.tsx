"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { CaretDown, Minus, Plus } from "@/utils/icons";
import { AccordionProps } from "./type";
import { hideDropdown, showDropdown } from "@/utils/motions/motions";

const Accordion = ({
  title,
  className,
  children,
  startExpanded = false,
  type = "accordion",
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(startExpanded);

  return (
    <div className={`w-full flex flex-col items-center mt-4 ${className} ${isExpanded? '': ''}`}>
      <div
        className={`flex flex-row items-center justify-between w-full pl-4 px-2 py-2 bg-gradient border`}
      >
        {/* accordion head */}
        <div
          className="flex flex-row w-full justify-between items-center gap-5 cursor-pointer relative"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <h3 className="font-minion">{title}</h3>
          {/* Flat Div */}
          <div
            className={`bg-active text-[white] w-[12px] h-[2px] ${
              type === "question" ? "bottom-[-9px]" : "top-[-9px]"
            } left-[3px] absolute ${isExpanded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="flex flex-row gap-4">
            <div className="w-8 h-8 flex justify-center items-center text-center rounded-full border bg-[#F5F8FF80]">
              {type !== "question" ? (
                <CaretDown
                  weight="bold"
                  size={14}
                  className={`shrink-none ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  } transition-all`}
                />
              ) : isExpanded ? (
                <Minus
                  weight="bold"
                  size={14}
                  className="shrink-none transition-all"
                />
              ) : (
                <Plus
                  weight="bold"
                  size={14}
                  className="shrink-none transition-all"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="w-full px-5 hidden no-scrollbar"
        animate={isExpanded ? showDropdown : hideDropdown}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;
