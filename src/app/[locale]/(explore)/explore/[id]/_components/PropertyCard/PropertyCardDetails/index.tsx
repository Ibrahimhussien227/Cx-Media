import React from "react";
import { useTranslations } from "next-intl";
import ProgressBar from "@/components/ProgressBar";
import CustomCount from "@/components/Counter";
import PropertyInfoBox from "@/components/PropertyInfoBox";
import { formateDate } from "@/utils/formateDate";
import ValidateModal from "./ValidateModal";

const PropertyCardDetails = ({
  data,
  forTransfer,
  count,
}: ICampaignData & { count?: string; forTransfer?: boolean }) => {
  const t = useTranslations("PropertyCard");
  const { financialDetails, campaignId } = data;

  const sharePrice = financialDetails.sharePrice || "-";
  const noOfSharesRemaining = financialDetails.noOfSharesRemaining || "-";
  const noOfShares = financialDetails.noOfShares || "-";
  const sharePricePerShare = financialDetails.sharePrice
    ? financialDetails.sharePrice.toFixed(2)
    : "-";
  const shareCount = count ? parseInt(count) * 1000 : "-";

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col px-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-start text-start px-4 py-3">
            <h1 className="text-[10px] text-secondary font-bold">VALUATION</h1>
            <p className="text-[20px] font-MinionPro">
              {financialDetails.propertyPrice || "_"}
              <span className="text-secondary text-[12px]">AED</span>
            </p>
          </div>
          <div className="flex flex-col items-end text-start px-4 py-3">
            <h1 className="text-[10px] text-secondary font-bold">
              SHARE PRICE
            </h1>
            <p className="text-[20px] font-MinionPro">
              {sharePrice}
              <span className="text-secondary text-[12px]">AED/Share</span>
            </p>
          </div>
        </div>
        {!forTransfer ? (
          <>
            <ProgressBar
              percent={(+noOfSharesRemaining / +noOfShares) * 100}
              color="green-prograss-bar"
            />
            <div className="flex flex-row items-center text-xs justify-between px-2 py-2 mt-2 rounded-[15px] bg-orangeStatus">
              <p className="text-[10px] font-bold">{t("availableShares")}</p>
              <div className="flex flex-row items-center text-[10px] font-bold">
                <p>{noOfSharesRemaining}</p>
                <p className="text-[#93A0C3]">/ {noOfShares}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between gap-2 bg-[#EDF7FF] px-4 py-[7.5px] mb-2 rounded-full text-[10px] font-bold">
            <p>FUNDING CLOSES ON</p>
            <p className="tracking-[0px]">23 October, 2023</p>
          </div>
        )}
        <div className="flex flex-col justify-between gap-y-2 p-4">
          <PropertyInfoBox
            title={t("annualizedReturn")}
            value={financialDetails.projectedAnnualizedReturn}
          />
          <PropertyInfoBox
            title={t("annualizedAppreciatiom")}
            value={financialDetails.projectedAnnualAppreciation}
          />
          <PropertyInfoBox
            title={t("projectGrossYield")}
            value={financialDetails.projectedGrossYield}
          />
          <PropertyInfoBox
            title={t("projectNetYield")}
            value={financialDetails.projectedNetYield}
          />
        </div>
      </div>
      <div className="flex text-lg flex-row justify-between items-center bg-[#2C3A5C] px-8 py-4">
        {forTransfer ? (
          <div className="flex flex-col items-start font-MinionPro">
            <p className="text-white text-[22px]">{sharePricePerShare} AED</p>
            <div className="text-[#D4E4F2] text-[14px] flex flex-row w-full gap-1">
              <p>{shareCount} Shares</p>@<p>{sharePricePerShare} AED/Share</p>
            </div>
          </div>
        ) : count ? (
          <div className="flex flex-col items-start font-MinionPro">
            <p className="text-white text-[22px]">
              {+sharePrice * +shareCount} AED
            </p>
            <p className="text-[#D4E4F2] text-[14px]">
              AED/{shareCount} Shares
            </p>
          </div>
        ) : (
          <p className="text-[#D4E4F2] text-[14px]">-</p>
        )}
        <div className="flex flex-row gap-4">
          {!forTransfer && <CustomCount />}

          <ValidateModal count={count ? +count : 1} campaignId={campaignId} />
        </div>
      </div>
      {forTransfer ? (
        <div className="ml-7 py-2 text-[#5A6A93] text-[14px]">
          Listed on 23 January, 2024
        </div>
      ) : (
        <p className="py-2 ml-5 text-[14px] text-secondary">
          Campaign Published on {formateDate(data.campaignPublishingTimestamp)}
        </p>
      )}
    </div>
  );
};

export default PropertyCardDetails;
