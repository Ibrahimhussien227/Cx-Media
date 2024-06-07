"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { NavItemProps } from "./type";

const NavItem = ({ title, to }: NavItemProps) => {
  const pathName = usePathname();

  const isActive = pathName === to || pathName === `/ar${to}`;

  return (
    <Link
      href={to}
      className={`${
        isActive && "bg-white border-b"
      } hover:bg-white hover:border-b relative text-secondary hover:text-black`}
    >
      <div className="flex flex-row items-center h-[70px] md:mx-8 mx-4 rounded-lg cursor-pointer gap-3">
        <p className={`${isActive && "text-black"}  font-semibold text-[10px]`}>
          {title}
        </p>
        {isActive && (
          <div className="absolute bottom-[-1px] left-[45%] h-[2px] w-3 bg-active" />
        )}
      </div>
    </Link>
  );
};

export default NavItem;
