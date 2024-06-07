"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SidebarNavItem from "./SidebarNavItem";
import { SidebarContentProps } from "./type";
import { hideSidebar, showSidebar } from "@/utils/motions/motions";
import { sidebarItems } from "./config";
import  {  CaretLeft, SignOut }  from "../../utils/icons";
import { ApplicationReviewStatus, KYCStatusEnum, SellerTypeEnum } from '@/types/enum.constants';
import { useLogoutMutation } from "@/store/services/auth/api";
import { useGetSellerProfileQuery } from "@/store/services/seller/profileApi";
import { usePathname } from "next/navigation";

const SidebarContent = ({ onClose, rest }: SidebarContentProps) => {

  const [navSize, changeNavSize] = useState("large");
  const [motionAttributes, setMotionAttributes] = useState({})
  const pathname = usePathname();

  useEffect(()=> {
    setMotionAttributes( window.innerWidth > 768? 
      {animate: navSize == "small" ? hideSidebar : showSidebar}
      :{})
  }, [navSize])

  const {data : ProfileResp} = useGetSellerProfileQuery(undefined, {skip: pathname === '/'});

  const {t} = useTranslation("sidebar");
  const [logoutUser] = useLogoutMutation();

  const user = ProfileResp?.data as ISellerProfile;

  const isUserSetUpDone = Boolean(user) && (
    user.kycStatus === KYCStatusEnum.VERIFIED &&
    user.isRegistrationFeePaid &&
    (user.sellerType !== SellerTypeEnum.BUSINESS ? true // solo seller is set up
    : // check business critaria 
    user.applicationReviewStatus === ApplicationReviewStatus.APPROVED)
  );
 
  return (
    <motion.div
      {...motionAttributes}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={`h-screen w-full sticky top-0 bottom-0 left-0 border-r justify-between bg-[#2C3A5C] ${rest}`}
    >
      <div className="flex flex-col">
        <div className="relative h-[70px] flex justify-between items-center border-b-[1px] mb-5">
          <Link
            href="/"
            className="flex flex-row items-center mx-4 rounded-lg cursor-pointer gap-3"
          >
            <div aria-label="Logo" className="shrink-0">
              {navSize === "small" ? (
                <img
                  src="/icons/logo-mobile.svg"
                  alt="Logo"
                  height={25}
                  width={25}
                />
              ) : (
                <img
                  src="/icons/logo-primary.svg"
                  alt="Logo"
                  height={20}
                  width={125}
                />
              )}
            </div>
          </Link>

          <div
            onClick={onClose}
            className="border rounded-[40px] bg-[#263b5a] p-[5px] relative right-[-14px]"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div
            className="absolute right-[-15px] w-8 h-8 md:flex hidden justify-center items-center text-center rounded-full border bg-[#2C3A5C] cursor-pointer"
            onClick={() => {
              changeNavSize(navSize == "small" ? "large" : "small");
            }}
          >
            <CaretLeft
              size={20}
              className={`transition-transform ${
                navSize === "small" ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        
        {isUserSetUpDone ? (
          <>
            {sidebarItems.map((item) => (
              <SidebarNavItem
                key={item.title}
                title={t(item.title)}
                to={item.to}
                Icon={item.icon}
                navSize={navSize}
              />
              
            ))}
          </>
        ) : (
          <>
            {" "}
            {sidebarItems.map(
              (item) =>
                item.title === "account.title" && (
                  <React.Fragment key={item.title}>
                    <Link
                      href={item.to}
                      className="flex flex-row items-center border-b-[1px] border-t-[1px]  bg-[#5A6A93] active px-[20px] py-[10px] cursor-pointer"
                    >
                      {" "}
                      <img
                        src="/icons/user-profile-small.svg"
                        alt="user-profile-small"
                        height={34}
                        width={34}
                      />
                      <div
                        className={`ml-[10px] ${
                          navSize == "small" ? "hidden" : "flex flex-col"
                        }`}
                      >
                        <p className="text-[#BFC5D5] text-[12px] tracking-[0px]">
                          ---
                        </p>
                        <p className="text-[#BFC5D5] text-[12px] tracking-[0px]">
                          {user?.companyDetails?.companyRepresentativeDetails?.officialEmail || 'name@gmail.com'}
                        </p>
                        <p className="text-[#BFC5D5] text-[12px] tracking-[0px]">
                          {user?.sellerName || t("sidebarAccount.sellerAdmin")}
                        </p>
                      </div>
                    </Link>
                    <div className={`py-[10px] ${
                          navSize == "small" ? "hidden" : "flex flex-col"
                        }`}>
                      <p className="text-[#BFC5D5] text-[12px] tracking-[0px] px-[20px] py-[10px]">
                        {t("sidebarAccount.contentOne")}
                      </p>
                      <p className="text-[#BFC5D5] text-[12px] tracking-[0px] px-[20px] py-[10px]">
                        {t("sidebarAccount.contentTwo")}
                        <Link
                          href={""}
                          className="text-[#FF6C02] font-bold ml-[5px]"
                        >
                          {t("sidebarAccount.helpCenter")}
                        </Link>
                      </p>
                      <p className="text-[#BFC5D5] text-[12px] tracking-[0px] px-[20px] py-[10px]">
                        {t("sidebarAccount.contentThere")}
                      </p>
                    </div>
                  </React.Fragment>
                )
            )}
          </>
        )}
      </div>

      <div className="flex flex-col">
        <Link
          href="#"
          onClick={()=> logoutUser()}
          className="flex flex-row items-center mx-[20px] my-[40px] rounded-lg cursor-pointer"
        >
          <SignOut size={20} className="rotate-180" />

          <span
            className={`${
              navSize == "small" && "hidden"
            } marker:flex ml-[10px] text-[#93A0C3] text-[10px] font-bold tracking-[1.5px]`}
          >
            LOGOUT
          </span>
        </Link>
        <hr />

        <span
          className={`${
            navSize == "small" && "opacity-0"
          } py-[20px] text-[#5A6A93] flex px-[20px] items-center text-[10px]`}
        >
          {t("copyright")}
        </span>
      </div>
    </motion.div>
  );
};

export default SidebarContent;
