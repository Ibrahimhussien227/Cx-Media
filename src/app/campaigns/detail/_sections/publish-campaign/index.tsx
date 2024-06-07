"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/button";
import { usePublishCampaignMutation } from "@/store/services/campaign/campaignDetailsApi";
import CustomDatePicker from "@/components/customDatePicker";
import { ICampaignSectionProps } from "../../types";
import { campaignStates } from "@/types/enum.constants";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import TagCheckbox from "@/components/TagCheckbox";
import SwitchButton from "@/components/SwitchButton";

const PublishCampaign = ({campaignDetails}:ICampaignSectionProps) => {
  
  const {t} = useTranslation("campaignsPage");
  const [isBeingScheduled, setIsBeingScheduled] = useState(false);
  const [publishCampaign, {isLoading}] = usePublishCampaignMutation();
  const [schedulingDate, setSchedulingDate] = useState<Date | null>(null)

  return (
    <div className="w-[100%] px-[20px] ">

      <div className="flex flex-col w-[100%]  py-[20px] mb-4 border-b-[1px]">
        <h2 className="text-[#FFFFFF] text-[20px] font-minion">
          {t("publishCampaign.title")}
        </h2>
        <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
          {t("publishCampaign.content")}
        </p>
      </div>

      <div className="flex justify-between w-[60%] py-[20px] mb-4 border-b-[1px]">
        <Button
          color="#FF6C02"
          disabled={isBeingScheduled || isLoading || campaignDetails.campaignState === campaignStates.PUBLISHED}
          className="self-center"
          onClick={()=> publishCampaign({campaignId: campaignDetails.campaignId, publishingTimestamp: new Date().toISOString()})}
        >
              {t("publishCampaign.publish")}
        </Button>

        <SwitchButton
          label="Scheduling Options"
          onClick={()=> setIsBeingScheduled(prevState=> !prevState)}
          isChecked={isBeingScheduled}
        />
      </div>

      <div className="flex w-[100%]  flex-col pt-[20px]">
        {isBeingScheduled && (
          <div className="flex w-[60%] items-center">
            {" "}
            <CustomDatePicker
              label="PUBLISH ON"
              placeholder="ex: Today, 22 November, 2023"
              type="text"
              onChange={(date: Date)=> setSchedulingDate(date)}
            />
            <Button
              color="#FF6C02"
              onClick={()=> schedulingDate && publishCampaign({campaignId: campaignDetails.campaignId, publishingTimestamp: schedulingDate.toISOString()})}
            >
                {t("publishCampaign.schedule")}
            </Button>
          </div>
        )}
        {campaignDetails.campaignState === campaignStates.PUBLISHED && (
          <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("publishCampaign.published") + formatDate(campaignDetails.campaignPublishingTimestamp as string, ', ')}
            {' '}
            <Link href="/campaigns?status=Published">
              view
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default PublishCampaign;
