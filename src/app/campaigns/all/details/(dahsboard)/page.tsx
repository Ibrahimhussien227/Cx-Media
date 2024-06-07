"use client";

import Image from "next/image";

import StatusTag from "@/components/StatusTag";
import ProgressBar from "@/components/ProgressBar";
import useGetCampaignDetails from "@/hooks/services/campaign/getCampaignDetails";
import DetailItem from "../../../../../components/TitleValueSpaceBetween";
import CampaignStatus from "./_components/CampaignStatus";
import CampaignDetailsSkeleton from "./Skeleton";

const CampaignsDashboard = ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { campaignDetails, isLoadingCampain } = useGetCampaignDetails(
    searchParams.id,
  );
  const percent =
    ((campaignDetails?.financialDetails?.noOfSharesRemaining ?? 0) /
      (campaignDetails?.financialDetails?.noOfShares ?? 1)) *
    100;

  return (
    <>
      {isLoadingCampain ? (
        <CampaignDetailsSkeleton />
      ) : (
        <div className="flex flex-col gap-3 h-full overflow-y-scroll mb-32 no-scrollbar">
          {" "}
          <div className="bg-white p-3 font-bold flex gap-3 items-center">
            <h2 className="font-bold py-2">
              {campaignDetails?.property.assetAppId}
            </h2>
            <StatusTag text={campaignDetails?.campaign.campaignStatus} />
          </div>
          <div className="flex flex-col bg-[#ffffff]">
            <div className="h-[240px] overflow-hidden">
              <Image
                width={240}
                height={240}
                src="/images/property2.jpg"
                alt="property2"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-row">
              {campaignDetails?.campaign.campaignState === "AVAILABLE" ? (
                <>
                  <CampaignStatus
                    title="CAMPAIGN LAUNCHED ON"
                    date={campaignDetails.campaign.publishedAt}
                    bgColor={`bg-[#0CC375] w-full`}
                  />
                  <CampaignStatus
                    title="CAMPAIGN CLOSES ON"
                    date={campaignDetails.campaign.closedAt}
                    bgColor={`bg-[#FF5A5A] w-full`}
                  />
                </>
              ) : (
                <CampaignStatus
                  title={
                    campaignDetails?.campaign.campaignStatus === "SCHEDULED"
                      ? "CAMPAIGN LAUNCHES ON"
                      : campaignDetails?.campaign.campaignStatus === "FUNDED"
                      ? "CAMPAIGN CLOSED ON"
                      : "-"
                  }
                  date={
                    campaignDetails?.campaign.campaignStatus === "SCHEDULED"
                      ? campaignDetails.campaign.publishedAt
                      : campaignDetails?.campaign.campaignStatus === "FUNDED"
                      ? campaignDetails.campaign.closedAt
                      : "-"
                  }
                  bgColor={`${
                    campaignDetails?.campaign.campaignStatus === "SCHEDULED"
                      ? "bg-[#009DFF]"
                      : campaignDetails?.campaign.campaignStatus === "FUNDED"
                      ? "bg-[#FF5A5A]"
                      : "bg-[#E9AB00]"
                  } w-full`}
                />
              )}
            </div>
            <div className="bg-white px-3 font-bold flex gap-3 items-center justify-between">
              <h2 className="font-bold ">{campaignDetails?.property.name}</h2>{" "}
              <StatusTag text={campaignDetails?.campaign.campaignState} />
            </div>
            <div className="flex flex-col py-3">
              <DetailItem
                title="Property Valuation"
                description={campaignDetails?.financialDetails?.propertyPrice}
                currency
              />
              <DetailItem
                title="Share Price"
                currency
                description={campaignDetails?.financialDetails?.sharePrice}
              />
              <DetailItem
                title="Minimum Investment"
                currency
                description={
                  campaignDetails?.financialDetails?.minimumInvestmentAmount
                }
              />
            </div>
            <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
            <div className="flex mx-[15px] mt-[15px]">
              <ProgressBar
                percent={percent}
                color={percent > 50 ? "red-prograss-bar" : "green-prograss-bar"}
              />
            </div>
            <div className="flex flex-col py-3">
              <DetailItem
                title="Fund Raised"
                description={campaignDetails?.financialDetails?.fundsRaised}
                subCurrency
                subDescription={
                  campaignDetails?.financialDetails?.propertyPrice
                }
              />
              <DetailItem
                title="Available Shares"
                description={
                  campaignDetails?.financialDetails?.noOfSharesRemaining
                }
                subDescription={campaignDetails?.financialDetails?.noOfShares}
              />
              <DetailItem
                title="Total Shareholders"
                description={
                  campaignDetails?.financialDetails?.numberOfInvestors
                }
              />
            </div>
            <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
            <div className="flex flex-col py-3">
              <DetailItem
                title="Smallest Investment Ticket"
                description={campaignDetails?.financialDetails?.propertyPrice}
                currency
              />
              <DetailItem
                title="Largest Investment Ticket"
                currency
                description={campaignDetails?.financialDetails?.sharePrice}
              />
              <DetailItem
                title="Average Investment Ticket"
                currency
                description={
                  campaignDetails?.financialDetails?.minimumInvestmentAmount
                }
              />
              <DetailItem
                title="Number of Investment Cancellation"
                currency
                description={
                  campaignDetails?.financialDetails?.minimumInvestmentAmount
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignsDashboard;
