"use client";

import { useGetCampaignByIdQuery } from "@/store/services/campaign/campaignDetailsApi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {ArrowLeft} from '@/utils/icons'
import { campaignStatus } from "@/types/enum.constants";

export default function CampaignLayout({
  children: campaignSetupPage,
  funded: fundedCampaignPage,
  published: publishedCampaignPage
}: {
  children: React.ReactNode;
  funded: React.ReactNode;
  published: React.ReactNode;
}){
  const {t} = useTranslation("campaignsPage");
  const searchParams = useSearchParams();
  const {data, isLoading} = useGetCampaignByIdQuery(searchParams.get('id') as string);
  const campaignDetails = data && data.data;

  return (
    <div>
      <div className="flex sm:px-10 px-5 py-6 items-center border-b-[1px] justify-between">
        <div className="flex items-center">
          <Link
            href={"/campaigns"}
            className="flex items-center gap-3 mx-2 text-[#5A6A93] text-[11px] font-bold uppercase tracking-[1.5px]"
          >
            <ArrowLeft size={20}  color="#5A6A93"/>
             {t("title")}
            <span className="text-inherit">|</span>
          </Link>
          <p className="font-bold text-[10px] tracking-[1.5px]">
              {campaignDetails?.assetDetails?.assetName}
          </p>
        </div>
      </div>
      <div className="sm:px-[40px]">
        {isLoading ?
          <p>Loading..</p> :
          campaignDetails?.campaignStatus === campaignStatus.FUNDED ?
            fundedCampaignPage :
            campaignDetails?.campaignStatus === campaignStatus.AVAILABLE ?
            publishedCampaignPage :
            campaignSetupPage // default
        }
      </div>
    </div>
  );

}