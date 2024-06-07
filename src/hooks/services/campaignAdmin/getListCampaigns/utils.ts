import { IGetApplicationStatsResponse } from "@/store/services/campaignAdmin/applicationStatsApi/type";
import { IGetCampaignStatsResponse } from "@/store/services/campaignAdmin/campaignStatsApi/type";
import { organizeDate } from "@/utils/dateOrganize";

export const filterCampaing = (campaign?: IAllCampaign[]) => {
  return campaign?.map((camp) => {
    return {
      campaign: {
        _id: camp.campaignId,
        campaignStatus: camp.campaignStatus,
        campaignState: camp.campaignState,
        createdAt: organizeDate(camp.campaignCreationTimestamp),
        publishedAt: organizeDate(camp.campaignPublishingTimestamp),
        closedAt: organizeDate(camp.campaignCloseTimestamp),
        updatedAt: organizeDate(camp.updatedAt),
      },
      property: {
        _id: camp.assetId,
        name: camp.assetDetails.assetName.substring(0, 20) + "...",
        reviewStatus: camp.reviewStatus,
        valuation: camp.financialDetails?.propertyPrice || null,
        sharePrice: camp.financialDetails?.sharePrice || null,
      },
      seller: {
        _id: camp.sellerId,
      },
    };
  });
};

export const filterCampaingStats = (
  stats?: IGetCampaignStatsResponse["data"],
) => {
  return [
    {
      title: "Unpublished",
      icon: "XCircle",
      value: stats?.UNPUBLISHED?.toString(),
    },
    {
      title: "Scheduled",
      icon: "Clock",
      value: stats?.SCHEDULED?.toString(),
    },
    {
      title: "Available",
      icon: "CheckCircle",
      value: stats?.AVAILABLE?.toString(),
    },
    {
      title: "Funded",
      icon: "WarningCircle",
      value: stats?.FUNDED?.toString(),
    },
    {
      title: "Exited",
      icon: "Prohibit",
      value: stats?.EXITED?.toString(),
    },
  ];
};
export const filterApplicationsStats = (
  stats?: IGetApplicationStatsResponse["data"],
) => {
  return [
    {
      title: "Draft",
      icon: "NotePencil",
      value: stats?.DRAFT?.toString(),
    },
    {
      title: "Pending Review",
      icon: "WarningCircle",
      value: stats?.PENDING_REVIEW?.toString(),
    },
    {
      title: "Pending Fee",
      icon: "WarningCircle",
      value: stats?.PENDING_FEE?.toString(),
    },
    {
      title: "Rejected",
      icon: "Prohibit",
      value: stats?.REJECTED?.toString(),
    },
    {
      title: "Approved to Publish",
      icon: "CheckCircle",
      value: stats?.APPROVED_TO_PUBLISH?.toString(),
    },
  ];
};
