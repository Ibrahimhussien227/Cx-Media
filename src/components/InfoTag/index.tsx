"use client";

import { useEffect, useState } from "react";

import { IInfoTagProps } from "./type";

const InfoTag = ({ display, onClick, initActive }: IInfoTagProps) => {
  const [isActive, setIsActive] = useState(initActive);

  useEffect(() => {
    setIsActive(initActive);
  }, [initActive]);

  return (
    <span
      onClick={() => {
        setIsActive((prevState) => !prevState);
        onClick(display);
      }}
      className={`
        font-medium text-[12px] capitalize shrink-0 flex p-2 rounded-[2px]
        cursor-pointer transition w-fit h-[31px]
        ${isActive ? "bg-primary text-white" : "bg-[#2C3A5C10]"}`}
    >
      {display}
    </span>
  );
};

export default InfoTag;
