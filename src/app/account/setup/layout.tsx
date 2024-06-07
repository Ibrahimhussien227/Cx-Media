"use client";

import { useGetSellerProfileQuery, useUpdateSellerProfileMutation } from "@/store/services/seller/profileApi";
import { SellerTypeEnum } from "@/types/enum.constants";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SetupLayout({
  children : SoloSetupPage,
  business: BusinessSetupPage
}: {
  children: React.ReactNode;
  business: React.ReactNode;
}) {
  const {data, isLoading: isLoadingUser} = useGetSellerProfileQuery();

  const [updateSellerProfile, {isLoading: isCreatingUser}] = useUpdateSellerProfileMutation();

  const type = useSearchParams().get("type") as string;
  const {t} = useTranslation("accountPage");

  useEffect(()=> {
    if (data && !(data.data instanceof Array) && !data.data.sellerType){ // seller profile exists for this user, and no type is set yet
      updateSellerProfile({
        sellerId: data.data.sellerId as string,
        sellerType: SellerTypeEnum[type as keyof typeof SellerTypeEnum]
      })
    }
  }, [updateSellerProfile, data, type])

  return (   
    <div className="sm:px-10 px-5 py-5">
      <div className="flex flex-col">
        <h2 className="text-[#FFFFFF] text-[20px] font-minion">
        {t("detailsPage.title")}
        </h2>
        <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
        {t("detailsPage.content")} {type === SellerTypeEnum.INDIVIDUAL? "Seller": "Business Seller"}.
        </p>
      </div>
      {isLoadingUser || isCreatingUser? <div>Loading...</div> :
       type === SellerTypeEnum.INDIVIDUAL? (
        SoloSetupPage
      ):(
        BusinessSetupPage
      )}
  </div>
  );
}