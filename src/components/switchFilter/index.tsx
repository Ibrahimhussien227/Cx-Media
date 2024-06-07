import React from "react";

import { SwitchFilterProps } from "./types";
import Link from "next/link";

const SwitchFilter = ({ items, searchParams }: SwitchFilterProps) => {
  const params = new URLSearchParams(searchParams.toString())
  const exisitingParamsObj = Object.fromEntries(params.entries())
  return (
    <nav className="flex flex-row divide-x  w-full  border  text-sm font-bold rounded-[2px]">
      {items.map(({ name, param, value}) => (
        <Link
          href={{ query: {...exisitingParamsObj, [param]: value } }}
          className={`${
            searchParams.get(param) === value
            ? "bg-active text-white"
            : "  text-[#5A6A93]"
          } flex justify-center w-full h-[30px]
          items-center px-4 cursor-pointer uppercase hover:bg-active hover:text-white   active:bg-active  `}
          key={name}
        >
          <p className="text-[10px] font-bold">{name} </p>
        </Link>
      ))}
    </nav>
  );
};

export default SwitchFilter;
