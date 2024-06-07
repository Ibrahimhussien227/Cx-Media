"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import SidebarContent from "./SidebarContent";
import { List } from "@/utils/icons";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes('sub-pages')){
    return null; // do not display side menu for subpages usually shown in iframes
  }

  return (
    <div className="w-full flex-1">
      <SidebarContent
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        rest="hidden md:flex md:flex-col sticky"
      />

      {isOpen && (
        <SidebarContent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          rest="flex flex-col w-full pr-1 absolute z-[9999] bg-[#FFFAF8]"
        />
      )}

      <div className="flex flex-row justify-start items-center md:hidden h-20 border-b md:px-24 px-4 bg-white">
        <List onClick={() => setIsOpen(true)} size={24} />

        <Link
          href="/"
          className="flex flex-row items-center mx-4 rounded-lg cursor-pointer gap-3"
        >
          <Image
            src="/images/logo-primary.svg"
            alt="Logo"
            height={124}
            width={124}
            className="w-full h-auto"
          />
        </Link>
      </div>
    </div>
  );
}
