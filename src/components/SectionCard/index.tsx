"use client";
import React from "react";

import { SectionCardProps } from "./type";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SectionCard = ({
  title,
  description,
  href,
  customWidth,
  searchParams,
}: SectionCardProps) => {
  const pathName = usePathname();
  const segment = pathName?.split("details")[1];

  let isActive = false;
  if (segment?.split("/").length == 3)
    isActive = href === `/${segment?.split("/")[1]}`;
  else isActive = href === segment;

  return (
    <Link
      className={`mt-1 relative flex grow shrink-1 basis-0
        gap-4 border bg-gradient-blue-white p-4 ${customWidth}
        ${isActive ? "" : "opacity-50"} ${!isActive ? "cursor-pointer" : ""}`}
      href={`${
        pathName?.split("details")[0]
      }/details/${href}?id=${searchParams}`}
    >
      {isActive && (
        <div className="absolute w-4 h-[0.15rem] top-[-0.09rem] left-4 bg-[#FF6C02]" />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <p className="text-primary font-bold text-[15px]">{title}</p>
        </div>
        <p className="text-[12px]">{description}</p>
      </div>
    </Link>
  );
};

export default SectionCard;
