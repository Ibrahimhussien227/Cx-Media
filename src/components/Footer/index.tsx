import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import CustomButton from "@/components/CustomButton";

const Footer = () => {
  const t = useTranslations("LandingPage.footer");

  return (
    <footer>
      <div className="flex flex-col items-center justify-between bg-[#2C3A5C] text-[#5A6A93] py-10 gap-5">
        <div className="flex flex-col w-[80%]">
          <div className="flex flex-row items-center cursor-pointer gap-3">
            <Image
              src="/images/logo-primary-white.svg"
              alt="Logo"
              height={20}
              width={150}
            />
          </div>
          <div className="flex flex-wrap justify-between items-start mt-5">
            <div className="flex flex-col gap-5 w-[20%] ">
              <p className="text-[#5A6A93] text-[12px]">{t("address")}</p>
              <p className="text-[#5A6A93] text-[12px]">{t("copyright")}</p>
            </div>
            <div className="flex flex-col gap-5">
              <Link
                className="text-[#5A6A93] text-[14px] font-bold"
                href="/invest"
              >
                {t("invest")}
              </Link>
              <Link
                className="text-[#5A6A93] text-[14px] font-bold"
                href="/sell"
              >
                {t("sell")}
              </Link>
              <Link
                className="text-[#5A6A93] text-[14px] font-bold"
                href="/learn"
              >
                {t("learn")}
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[#5A6A93] text-[14px] font-bold">
                {t("terms")}
              </p>
              <p className="text-[#5A6A93] text-[14px] font-bold">
                {t("policy")}
              </p>
              <p className="text-[#5A6A93] text-[14px] font-bold">
                {t("keyRisks")}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center bg-white px-1 py-1 rounded-sm w-[30%]">
              <input
                placeholder={t("inputPlaceHolder")}
                className="text-[#93A0C3] text-[14px] px-[10px]"
              />
              <CustomButton
                disabled={true}
                className="bg-active px-4 py-2 rounded-sm disabled:opacity-50"
              >
                <p className="text-white text-[10px]">{t("buttonEmailText")}</p>
              </CustomButton>
            </div>
          </div>
        </div>
        <hr className="w-[80%] border-[#5A6A93]" />

        <p className="w-[80%] overflow-clip text-[#5A6A93] text-[12px]">
          {t("footerText")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
