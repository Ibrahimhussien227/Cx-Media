"use client";
import React from "react";
import StatusTag from "@/components/statusTag";
import { CampaignReviewStatus } from "@/types/enum.constants";
import Button from "@/components/button";
import { reviewStatusColorMap } from "../../../config";
import { useTranslation } from "react-i18next";
import { ICampaignSectionProps } from "../../types";
import { useSubmitCampaignForReviewMutation } from "@/store/services/campaign/campaignDetailsApi";

const CampaignReview = ({campaignDetails}:ICampaignSectionProps) => {
  const {t} = useTranslation("campaignsPage");

  const [submitCampaignForReview, {isLoading}] = useSubmitCampaignForReviewMutation()

  const reviewStatus = campaignDetails.reviewStatus;
  
  return (
    <div className="flex flex-col w-[100%] px-[20px] ">
      <div className="flex flex-col w-[100%] border-b-[1px]">
        <div className="flex items-center py-[20px] justify-between">
          <div className="flex flex-col">
            <h2 className="text-[#FFFFFF] text-[20px] font-minion">              
              {t("campaignReview.title")}
            </h2>
            <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
            {t("campaignReview.content")}
            </p>
          </div>
         
          <div className="items-end flex gap-4">
            {[CampaignReviewStatus.PENDING_REVIEW, CampaignReviewStatus.APPROVED_TO_PUBLISH, CampaignReviewStatus.REJECTED, CampaignReviewStatus.PENDING_FEE].includes(reviewStatus) &&
            (
              <div className="flex flex-col items-end gap-2">
                <StatusTag
                  text={[CampaignReviewStatus.APPROVED_TO_PUBLISH, CampaignReviewStatus.PENDING_FEE].includes(reviewStatus)? "PASSED": reviewStatus}
                  color={reviewStatusColorMap[reviewStatus as keyof typeof reviewStatusColorMap]}
                />
                <p className="text-[#BFC5D5] text-[12px] tracking-[0]">
                  updated at {campaignDetails.updatedAt}
                </p>
              </div>
            )}
            {[CampaignReviewStatus.DRAFT, CampaignReviewStatus.REJECTED].includes(reviewStatus) && (
              <Button
                color="#FF6C02"
                className="items-end"
                onClick={()=> submitCampaignForReview(campaignDetails.campaignId)}
                disabled={isLoading}
              >
                {t(`campaignReview.${reviewStatus === CampaignReviewStatus.DRAFT? 'submit': 'tryAgain'}`)}
              </Button>
            )}
            { isLoading && <span>Loading...</span> }
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignReview;
