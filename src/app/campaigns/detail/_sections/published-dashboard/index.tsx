"use client";
import LogsList from "@/components/LogsList";
import StatsCard from "@/components/StatsCard";
import Button from "@/components/button";
import { useTranslation } from "react-i18next";
import { campaignLogs } from "./configs";
import ProgressBar from "@/components/ProgressBar";
import CallOut from "@/components/callout";
import {Info} from '@/utils/icons';
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { campaignStatus } from "@/types/enum.constants";
import GeneralModal from "@/components/generalModal";

const PublishedCampaignDashboard =({campaignDetails}: {campaignDetails: ICampaignDetails})=>{
  const {t} = useTranslation("campaignsPage");
  const thumbnailPic = campaignDetails.assetDetails?.assetMediaFiles?.find((fileData:IAssetMediaFiles)=> fileData.isThumbnail);
  const [openRefunPopup, setOpenRefundPopup] = useState(false);
  const [refunded, setRefunded] = useState(false);

  const closeRefundPopup =()=> setOpenRefundPopup(false);
  
  return (
    <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-5">
        <CallOut>
          {refunded ? (
            <>
              {" "}
              <strong className="flex gap-1 items-center font-normal text-sm">
                <Info color="white" weight="bold" size={20} />
                {t("publishedCampaign.refundConfirmed")}
              </strong>
              <p className="my-3 font-thin tracking-tight text-[12px]">
              {t("publishedCampaign.refundConfirmedDesc")}
              </p>
            </>
          ) : (
            <>
              <strong className="flex gap-1 items-center font-normal text-sm">
                <Info color="white" weight="bold" size={20} />
                {t("publishedCampaign.refundNotice")}
              </strong>
              <p className="my-3 font-thin tracking-tight text-[12px]">
                {t("publishedCampaign.refundNoticeDesc")}
              </p>
              <div className="flex items-center gap-2">
                <Button color="#D4E4F2" /* className="text-[#2C3A5C]" */>
                  {t("publishedCampaign.addDays")}
                </Button>
                <Button
                  color="#5A6A93"
                  className="p-3.5"
                  onClick={() =>
                    campaignDetails.campaignStatus !==
                      campaignStatus.REFUNDED && setOpenRefundPopup(true)
                  }
                >
                  {t("publishedCampaign.refundInvestors")}
                </Button>
              </div>
            </>
          )}
        </CallOut>
        <img
          src={thumbnailPic?.filePath}
          alt={thumbnailPic?.fileName}
          height={280} // what about mobile?
          className="w-full object-cover"
        />
        {campaignDetails.campaignStatus === campaignStatus.REFUNDED && (
          <CallOut>
            <strong className="flex gap-1 items-center font-normal text-sm">
              <Info color="white" weight="bold" size={20} />
              {t("publishedCampaign.referenceNoteHead")}
            </strong>
            <p className="my-3 font-thin tracking-tight text-[12px]">
              {t("publishedCampaign.referenceNoteDesc")}
            </p>
          </CallOut>
        )}
        <div className="flex gap-4">
          <StatsCard title={"funds Raised"}>
            {campaignDetails.financialDetails?.FundsRaised || 0}
            <span className="text-[10px] font-light"> AED</span>
          </StatsCard>
          <StatsCard title={"investors"}>
            {campaignDetails.financialDetails?.NumberOfInvestors || 0}
          </StatsCard>
          <StatsCard title={"Campaign end"}>
            {campaignDetails.campaignCloseTimestamp &&
              formatDate(campaignDetails.campaignCloseTimestamp, " ", [
                "d",
                "m",
                "y",
              ])}
          </StatsCard>
        </div>
        <ProgressBar
          percent={
            ((campaignDetails.financialDetails?.noOfSharesSold || 5) /
              (campaignDetails.financialDetails?.noOfShares || 100)) *
            100
          }
        />
        <div className="grid gap-3">
          <div className="flex gap-2 justify-between">
            <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
              {t("publishedCampaign.propertyValuation")}
            </p>
            <hr className="shrink-0 grow border-dotted self-center" />
            <p>
              {campaignDetails.financialDetails?.propertyPrice}
              <span className="text-faint text-[12px] font-extralight">
                AED
              </span>
            </p>
          </div>
          <div className="flex gap-2 justify-between">
            <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
              {t("publishedCampaign.sharePrice")}
            </p>
            <hr className="shrink-0 grow border-dotted self-center" />
            <p>
              {campaignDetails.financialDetails?.sharePrice}
              <span className="text-faint text-[12px] font-extralight">
                AED
              </span>
            </p>
          </div>
          <div className="flex gap-2 justify-between">
            <p className="text-[12px] text-faint tracking-[1.5px] uppercase">
              {t("publishedCampaign.minimumInvestment")}
            </p>
            <hr className="shrink-0 grow border-dotted self-center" />
            <p>
              {campaignDetails.financialDetails?.MinimumInvestmentAmount}
              <span className="text-faint text-[12px] font-extralight">
                AED/{campaignDetails.financialDetails?.MinimumInvestmentShare}{" "}
                Shares
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="self-start grid gap-7">
        <LogsList
          data={campaignDetails}
          logs={campaignLogs}
          title={t("publishedCampaign.logsTitle")}
          className="bg-[#232F4B]"
        />
        <div className="p-4">
          <h4>{t("publishedCampaign.moreTime")}</h4>
          <p className="font-light text-[12px] mt-1 mb-3">
            {t("publishedCampaign.extendDuration")}
          </p>
          <Button color="#D4E4F2" /* className="text-[#2C3A5C]" */>
            {t("publishedCampaign.addDays")}
          </Button>
        </div>
      </div>

      <GeneralModal isOpen={openRefunPopup} onClose={closeRefundPopup}>
        <div className="flex justify-center items-center flex-col p-[0]">
          <h2
            className={`relative font-minion text-[18px] pb-[10px] after:block after:w-8 after:h-[1px] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-orange after:rounded-sm`}
          >
            {t(
              `publishedCampaign.${
                refunded ? "refundConfirmed" : "refundInvestorsQ"
              }`
            )}
          </h2>
          <p className="text-[#BFC5D5] pt-[10px] text-[12px] tracking-[0px] text-center">
            {t(
              `publishedCampaign.${
                refunded ? "refundConfirmedDesc" : "refundInvestorsDesc"
              }`
            )}
          </p>
        </div>
        <div className="flex gap-2 pt-[20px] pb-[10px]">
          {!refunded && (
            <Button
              color="#5A6A93"
              onClick={closeRefundPopup}
              className="w-full shrink"
            >
              {t("publishedCampaign.cancel")}
            </Button>
          )}
          <Button
            color="#FF6C02"
            onClick={() =>
              refunded
                ? closeRefundPopup()
                : setTimeout(() => setRefunded(true), 1000)
            } //mocking the api call
            className="w-full shrink"
          >
            {t(`publishedCampaign.${refunded ? "ok" : "proceedRefund"}`)}
          </Button>
        </div>
      </GeneralModal>
    </div>
  );
}

export default PublishedCampaignDashboard;