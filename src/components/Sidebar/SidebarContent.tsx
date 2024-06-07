import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import SidebarNavItem from "./SidebarNavItem";
import { ISidebarContentProps } from "./tybe";
import { hideSidebar, showSidebar } from "@/utils/motions";
import { CaretRight } from "@/utils/icons";
import * as icons from "@/utils/icons";
import { sidebarItems } from "./config";

const SidebarContent = ({ isOpen, setIsOpen, rest }: ISidebarContentProps) => {
  const [navSize, changeNavSize] = useState("large");
  const [checkNavSize, setCheckNavSize] = useState(false);

  const t = useTranslations("InvestorDashboardPage.sidebar");

  const attributes = checkNavSize && {
    animate: navSize == "small" ? hideSidebar : showSidebar,
  };

  useEffect(() => {
    window.innerWidth > 768 && setCheckNavSize(true);

    window.innerWidth > 640 && setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.div
      {...attributes}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={`h-screen w-[240px]  top-0 bottom-0 left-0 border-r justify-between text-secondary ${rest}`}
    >
      <div>
        <div className="h-[70px] flex justify-between items-center border-b-[1px] mb-5">
          <Link
            href="/"
            className={`flex flex-row items-center ${
              navSize == "small" ? "mx-1" : "mx-4"
            }  rounded-lg cursor-pointer gap-3`}
          >
            <Image
              src="/images/logo-primary.svg"
              alt="Logo"
              height={124}
              width={124}
              className="w-auto h-auto"
            />
          </Link>
          {isOpen && <icons.X size={20} onClick={() => setIsOpen(false)} />}
          <div
            className="absolute z-[80] right-[-15px] w-7 h-7 md:flex hidden justify-center items-center text-center rounded-full border bg-white cursor-pointer"
            onClick={() => {
              navSize == "small"
                ? changeNavSize("large")
                : changeNavSize("small");
            }}
          >
            <CaretRight
              size={12}
              className={`shrink-none ${
                navSize == "small" ? "rotate-0" : "rotate-180"
              } transition-all`}
            />
          </div>
        </div>

        {sidebarItems.map((item) => (
          <SidebarNavItem
            key={item.title}
            title={t(item.title)}
            to={item.to}
            Icon={icons[item.icon as keyof typeof icons]}
            navSize={navSize}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <SidebarNavItem
          title="JOHN DOE"
          to="/profile"
          navSize={navSize}
          Icon="profile-icon.svg"
        />
        <h1
          className={`${
            navSize == "small" && "opacity-0"
          } h-24 bg-white text-[#BFC5D5] flex px-4 items-center text-xs bg-gradient-to-r from-white to-[#FFFAF8]`}
        >
          {t("copyright")}
        </h1>
      </div>
    </motion.div>
  );
};

export default SidebarContent;
