"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { ISideNavItemProps } from "./tybe";
import Wallet from "@/utils/icons/wallet";

const SidebarNavItem = ({ title, to, navSize, Icon }: ISideNavItemProps) => {
  const pathName = usePathname();
  const { locale } = useParams();

  const isActive =
    pathName === to ||
    pathName === `/${locale}${to}` ||
    pathName.includes(to === "/" ? "explore" : to);

  return (
    <div
      className={`w-full relative my-2 ${
        isActive
          ? "border-b-[1px] border-t-[1px] bg-white"
          : "bg-gradient-white-transparent"
      }`}
    >
      <Link href={to} className="">
        <div
          className={`flex flex-col items-start justify-center py-4 mx-4 cursor-pointer ${
            isActive && "text-black"
          }`}
        >
          <div className="flex flex-row items-center gap-3">
            {typeof Icon === "string" ? (
              <Image
                src={`/images/${Icon}`}
                width={0}
                height={0}
                className="w-auto h-auto size-4"
                alt={to}
              />
            ) : (
              <Icon size={24} />
            )}

            <div className={navSize == "small" ? "hidden" : "flex flex-col"}>
              <p className="font-bold text-[10px]">{title}</p>
              {to === "/profile" && (
                <>
                  <p className="text-secondary text-[10px]">name@xyz.com</p>
                </>
              )}
            </div>
          </div>
          {isActive && (
            <div className="top-[20px] absolute right-[-1px] h-3 w-[2px] bg-active" />
          )}
          {to === "/profile" && (
            <div className="flex flex-col items-center ">
              <div className="w-8 h-[1px] bg-[#D4E4F2] my-2" />

              <div className="flex flex-row gap-4 items-center">
                <Wallet size={24} />
                <p className={navSize == "small" ? "hidden" : "block"}>
                  56,900.50 AED
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SidebarNavItem;
