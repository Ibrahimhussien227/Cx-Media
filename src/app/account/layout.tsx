"use client";
import Button from "@/components/button";
import CallOut from "@/components/callout";
import { useGetSellerProfileQuery } from "@/store/services/seller/profileApi";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "@/utils/icons/index";
import { onboardedAccNavItems } from "./configs";
import NavCard from "@/components/NavCard";
import { ApplicationReviewStatus, KYCStatusEnum, SellerTypeEnum } from "@/types/enum.constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import StatusTag from "@/components/statusTag";

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const {t} = useTranslation("accountPage");
  const {data, isLoading} = useGetSellerProfileQuery();
  const user = data?.data;
  const isUserSetUpDone = user && (
 
    user.kycStatus === KYCStatusEnum.VERIFIED &&
    user.isRegistrationFeePaid &&
    (user.sellerType !== SellerTypeEnum.BUSINESS ? true // solo seller is set up
    : // check business critaria 
    user.applicationReviewStatus === ApplicationReviewStatus.APPROVED)
  );
  //force redirect user to the form suitable to his type as a seller (type selection cannot be changed once chosen and saved once)
  useEffect(()=> {
    const isUserStillSettingUp = !isUserSetUpDone;
    const isVerifiedIndividual = user?.sellerType === SellerTypeEnum.INDIVIDUAL && user.kycStatus === KYCStatusEnum.VERIFIED;
    const isEstablishedBusiness = user?.sellerType === SellerTypeEnum.BUSINESS &&  Boolean(user.companyDetails?.companyId)
    if (
      isUserStillSettingUp && 
      ( isVerifiedIndividual || isEstablishedBusiness)
    ){
      router.replace(`/account/setup?type=${user?.sellerType}`)
    }
  }, [pathname, user, isUserSetUpDone, router])

  return (   
     <>
      <header className="sm:px-10 px-5 py-5 flex items-center border-b-[1px]">
        <h1 className="text-[20px]">{t("title")}</h1>
      </header>
      {isLoading? 
        <div>Loading...</div>
        :
        <div className="sm:px-[40px] px-5">
          {
            isUserSetUpDone?
            <div className="flex gap-4 py-5 sm:flex-row flex-col">
             
              <ul className="sm:min-w-[260px]">
                {onboardedAccNavItems.map(item=> (
                  <li key={item.href}>
                    <NavCard
                      title={t(`nav.${item.title}`)}
                      description={t(`nav.${item.description}`)}
                      href={item.href}
                      // eslint-disable-next-line react/no-children-prop
                      children={["/account", "/account/verification"].includes(item.href)?
                        <StatusTag // as this while section of viewing the account will be available only after verification is successfull
                          text="VERIFIED"
                          color="green"
                        />
                      : undefined}
                    />
                  </li>
                ))}
              </ul>
                {children}
            </div>
            : pathname.includes("setup")? children : (
              <>
                <div className="flex flex-col pt-[10px] pb-[20px]">
                  <h2 className="text-[20px] font-minion">
                    {t("applyPage.title")}
                    </h2>
                  <p className="text-[#93A0C3] text-[12px] tracking-[0]">
                    {t("applyPage.content")} &nbsp;
                    <span className="font-bold">{t("applyPage.subContent")}</span>
                  </p>
                </div>

                <div className="flex flex-col w-[80%] gap-5">
                  <CallOut>
                    <h4 className="text-[16px] font-minion">
                      {t("applyPage.proprietor")}
                    </h4>
                    <div className="flex justify-between gap-8">
                      <p className="text-[#BFC5D5] text-[12px] tracking-[0px]">
                      {t("applyPage.proprietorContent")}
                        <Link href={""} className="text-[#FF6C02] font-bold ml-[5px]">
                        {t("applyPage.learnMore")}
                        </Link>
                      </p>
                      <Button
                        color="#FF6C02"
                        to={`/account/setup?type=${SellerTypeEnum.INDIVIDUAL}`}
                        className="self-end"
                      >
                        {t("applyPage.ApplyNow")}
                        <ArrowRight size={20} className="ml-[5px]" />
                      </Button>
                    </div>
                  </CallOut>
                  <CallOut>
                    <h4 className="text-[16px] font-minion">{t("applyPage.business")}</h4>
                    <div className="flex justify-between gap-8">
                      <p className="text-[#BFC5D5] text-[12px] tracking-[0px]">
                      {t("applyPage.proprietorContent")}
                        <Link href={""} className="text-[#FF6C02] font-bold ml-[5px]">
                        {t("applyPage.learnMore")}
                        </Link>
                      </p>
                      <Button
                        color="#FF6C02"
                        to={`/account/setup?type=${SellerTypeEnum.BUSINESS}`}
                        className="self-end"
                      >
                      {t("applyPage.ApplyNow")}
                        <ArrowRight size={20} className="ml-[5px]" />
                      </Button>
                    </div>
                  </CallOut>
                </div>
              </>
            )
          }
        </div>
      }
     </>
  );
}