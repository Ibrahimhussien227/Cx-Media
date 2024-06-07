"use client";
import React from "react";
import { ProgressStatuses } from "@/types/enum.constants";
import { statusIndicatorStyling, statusIndicatorIcon } from "./configs";
import { IProgressTabBarProps } from "./types";
import Button from "../button";
import { ArrowRight } from "@/utils/icons/index";

const ProgressTabs =({
  tabs,
  value,
  onChange,
  className,
  actionButton
}: IProgressTabBarProps)=> {
  

  const handleNextClick =()=>{
    const isCurrentDone = value.status === ProgressStatuses.DONE; 
    const curreentTabIdx = tabs.findIndex(tab=> tab.value === value.value);   
    if (isCurrentDone && curreentTabIdx < tabs.length - 1){
      onChange(curreentTabIdx + 1)
    }
  }

  return (
    <div className={`flex items-center justify-between gap-2 border-t border-b pr-4 ${className}`}>
      <ul className="list-none flex items-center  overflow-auto sm:px-4 gap-6">
        {tabs.map((tab, idx)=> {
          const isActive = tab.value === value.value;
          const canBeSwitchTo = idx === 0 || tabs[idx-1].status === ProgressStatuses.DONE;
          const IndicatorIcon = statusIndicatorIcon[tab.status as keyof typeof statusIndicatorIcon]
          return (
            <li
              key={tab.value}
              onClick={() => canBeSwitchTo && onChange(idx)} // user can switch to this tab only if previous step is done
              className={`
                cursor-pointer pt-2.5 pb-2.5 shrink-0
                ${isActive ? "border-b border-b-orange" : ""}
              `}
            >
              <span
                className={`
                  inline-flex gap-2 px-2 py-1 items-center
                  border border-[#5A6A93] rounded-xl text-[10px] font-medium tracking-[1.5px] uppercase 
                  ${
                    isActive
                      ? "bg-[#5A6A93] text-white border border-secondary"
                      : " bg-transparent text-[#93A0C3]"
                  }
                `}
              >
                {idx + 1 + ". " + tab.display}
                {IndicatorIcon && (
                  <span className="bg-white rounded-[50%] w-fit">
                    <IndicatorIcon
                      size={18}
                      color={
                        statusIndicatorStyling[
                          tab.status as keyof typeof statusIndicatorStyling
                        ]
                      }
                      weight="fill"
                      className="-m-1"
                    />
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
   
      <Button
        color="#FF6C02"
        className=""
        onClick={actionButton?.onClick || handleNextClick}
        disabled={actionButton?.disabled}
      >
        {actionButton?.text || "next"}
        {!actionButton && <ArrowRight size={12}/>}
      </Button>
       
    </div>
    
  );
}


export default ProgressTabs;