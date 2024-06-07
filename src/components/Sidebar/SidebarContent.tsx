"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import SidebarNavItem from "./SidebarNavItem";
import { ISidebarContentProps } from "./type";

import * as icons from "@/utils/icons";
import { sidebarItems } from "./config";
import { Icon } from "@phosphor-icons/react";

const SidebarContent = ({
  isOpen = false,
  setIsOpen,
  rest,
}: ISidebarContentProps) => {
  const { t } = useTranslation("sidebar");

  useEffect(() => {
    window.innerWidth > 640 && setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div
      className={`h-screen overflow-y-scroll overflow-x-hidden no-scrollbar sticky top-0 left-0 border-r justify-between ${rest}`}
    >
      <div>
        <div className="relative h-[70px] flex justify-between items-center mb-5">
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
          {isOpen && <icons.X size={20} onClick={() => setIsOpen(false)} />}
        </div>

        {sidebarItems.map((item) => (
          <SidebarNavItem
            key={item.title}
            title={t(item.title)}
            to={item.to}
            Icon={icons[item.icon as keyof typeof icons] as Icon}
            items={item?.items}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <hr />

        <SidebarNavItem
          title="Sachin Baghel"
          to="/profile"
          Icon="profile-icon.svg"
        />
      </div>
    </div>
  );
};

export default SidebarContent;
