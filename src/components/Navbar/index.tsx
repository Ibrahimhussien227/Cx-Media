import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import NavItem from "./NavItem";
import { SIDEBARITEM } from "./config";
import CustomButton from "../CustomButton";
import { AUTH_URL } from "@/constants";

const Navbar = () => {
  const t = useTranslations("LandingPage.navbar");

  return (
    <nav className="w-full h-[70px] left-0 right-0 bg-gradient-to-b from-white to-[#FFFAF8] border-b flex flex-row items-center justify-between px-8 z-50">
      <div className="flex flex-row items-center">
        <Link
          href="/"
          className="flex flex-row items-center cursor-pointer gap-3"
        >
          <Image
            src="/images/logo-primary-black.svg"
            alt="Logo"
            height={20}
            width={150}
          />
        </Link>
        <div className="flex flex-row divide-x border-l-[0.1px] border-r md:ml-32 ml-5">
          {SIDEBARITEM.map(({ title, to }) => (
            <NavItem key={title + to} title={t(title)} to={to} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="border-l-[1px] h-[70px] md:flex hidden" />
        <CustomButton className="bg-active text-[10px] px-[10px] text-white h-[30px] font-bold ml-10 rounded-[2px] tracking-[1.5px]">
          <Link href={AUTH_URL} passHref={true}>
            {t("loginText")}
          </Link>
        </CustomButton>
      </div>
    </nav>
  );
};

export default Navbar;
