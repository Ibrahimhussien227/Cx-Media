"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';
import SidebarContent from "./SidebarContent";
import  { List }  from "../../utils/icons";
import Button from "@/components/button";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes('sub-pages')){
    return null; // do not display side menu for subpages usually shown in iframes
  }
  const onOpen = () => {
    console.log('aaa')
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
   <div className="w-full flex-1">
      <SidebarContent onClose={onClose} rest="hidden md:flex md:flex-col" />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={onClose}
          ></div>
          <div className="w-[80%] left-0 absolute transition-all duration-300 ease-in-out">
            <SidebarContent onClose={onClose} rest="flex flex-col" />
          </div>
        </div>
      )}

      <div className="flex flex-row justify-start items-center md:hidden h-20 border-b md:px-24 px-4 bg-[#2C3A5C]">
        <Button
          color="transparent"
          className="p-[0] border-0"
          onClick={onOpen}
          aria-label="open menu"
        >
          <List size="20" color="#ffffff" />
        </Button>
        <Link
          href="/"
          className="flex flex-row items-center mx-4 rounded-lg cursor-pointer gap-3"
        >
          <Button
            color='transparent'
          >
            <Image
              src="/icons/logo-primary.svg"
              alt="Logo"
              height={20}
              width={125}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}

