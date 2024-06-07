import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import PropertyInfoBox from "@/components/PropertyInfoBox";
import { ArrowRight } from "@/utils/icons";

const ShowcaseCardDetails = ({ data }: ICampaignData) => {
  const t = useTranslations("PropertyCard");

  const { financialDetails, campaignId } = data;

  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-white to-[#FFFAF8] mt-8">
      <div className="flex flex-row items-center text-xs justify-between px-2 bg-[#FFFAF8] py-2 rounded-[15px] mx-4">
        <p className="text-[10px] font-bold">{t("availableShares")}</p>
        <p className="text-[10px] font-bold">
          {financialDetails?.noOfSharesRemaining} /{" "}
          {financialDetails?.noOfShares}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-400 px-4">
        <PropertyInfoBox
          title={t("annualizedReturn")}
          value={financialDetails?.projectedAnnualizedReturn}
        />
        <PropertyInfoBox
          title={t("annualizedAppreciatiom")}
          value={financialDetails?.projectedAnnualAppreciation}
        />
        <PropertyInfoBox
          title={t("projectGrossYield")}
          value={financialDetails?.projectedGrossYield}
        />
        <PropertyInfoBox
          title={t("projectNetYield")}
          value={financialDetails?.projectedNetYield}
        />
      </div>

      <div className="mt-1 flex justify-between gap-4 bg-primary py-3 text-sm bg-default w-full px-4">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="text-[#D4E4F2] text-[10px] font-bold">
              {t("minInvest")}
            </p>
            <div className="flex flex-row gap-2 font-MinionPro">
              <p className="text-white text-[20px] tracking-[1.5px]">
                {financialDetails?.minimumInvestmentAmount}
              </p>
              <p className="text-[14px] text-white">
                AED/ {financialDetails?.minimumInvestmentShare} Shares
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link
            href={`/explore/${campaignId.replace(/[.\s]/g, "")}`}
            className="bg-active text-xs text-white flex flex-row gap-x-4 rounded-[2px] py-2 px-4 items-center justify-center"
          >
            {t("view")}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCardDetails;
