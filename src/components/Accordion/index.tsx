import React, { useState } from "react";
import { motion } from "framer-motion";

import { AccordionProps } from "./type";
import { hideDropdown, showDropdown } from "@/utils/motions";
import { CaretDown } from "@/utils/icons";
import StatusTag from "../StatusTag";

const Accordion = ({
  EditButton,
  title,
  status,
  userId,
  className,
  children,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className={`w-full flex flex-col items-center h-fit ${className}`}>
      <div className="flex flex-row items-center justify-between w-full border-b pt-1 pb-2">
        <div className="flex flex-row w-full justify-between items-center ">
          {userId ? (
            <>
              <h3
                className={`font-bold text-[18px] flex whitespace-nowrap text-[#2C3A5C] mx-3 opacity-60`}
              >
                {title}
              </h3>
              <h3 className="ml-1 min-w-[70px] text-[18px] font-bold flex whitespace-nowrap">
                {userId}
              </h3>
            </>
          ) : (
            <h3 className="font-bold flex whitespace-nowrap">{title}</h3>
          )}

          {status && <StatusTag className="ml-2" text={status} />}

          {EditButton}

          <div className="py-1 px-1 mx-3 flex justify-center items-center text-center rounded-full border bg-[#F5F8FF80] cursor-pointer">
            <CaretDown
              onClick={() => setIsExpanded((prevState) => !prevState)}
              weight="bold"
              size={18}
              className={`shrink-none ${
                isExpanded ? "rotate-180" : "rotate-0"
              } transition-all`}
            />
          </div>
        </div>
      </div>
      {/* overflow-y-scroll no-scrollbar => this code has been removed fopm motion.div due to the accordion (location) in details-form page */}
      <motion.div
        className="w-full hidden no-scrollbar"
        initial={showDropdown}
        animate={isExpanded ? showDropdown : hideDropdown}
        exit={hideDropdown}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;
