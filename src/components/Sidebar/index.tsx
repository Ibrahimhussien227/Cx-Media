"use client";

import React, { useState } from "react";

import Image from "next/image";

import SidebarContent from "./SidebarContent";
import Link from "next/link";
import { List } from "@/utils/icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white md:min-w-56">
      <SidebarContent
        setIsOpen={setIsOpen}
        rest="hidden md:flex md:flex-col sticky"
      />
      {isOpen && (
        <SidebarContent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          rest="flex flex-col  pr-1 absolute z-[9999]"
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
            height={20}
            width={124}
          />
        </Link>
      </div>
    </div>
  );
}
