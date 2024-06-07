import { organizeDate } from "@/utils/dateOrganize";

export const filterCampainDetails = (campaign: ISingleCampaign) => {
  return {
    campaign: {
      _id: campaign?.campaignId,
      campaignStatus: campaign.campaignStatus,
      campaignState: campaign.campaignState,
      createdAt: organizeDate(campaign.campaignCreationTimestamp),
      publishedAt: organizeDate(campaign.campaignPublishingTimestamp),
      closedAt: organizeDate(campaign.campaignCloseTimestamp),
      updatedAt: organizeDate(campaign.updatedAt),
    },
    property: {
      _id: campaign.assetId,
      name: campaign.assetDetails.assetName,
      reviewStatus: campaign.reviewStatus,
      completionStatus: campaign.assetDetails.completionStatus,
      description: campaign.assetDetails.assetDescription,
      area: campaign.assetDetails.assetArea,
      noOfBed: campaign.assetDetails.numberOfBed,
      noOfBath: campaign.assetDetails.numberOfBath,
      investmentType: campaign.assetDetails.assetInvestmentType,
      propertyType: campaign.assetDetails.assetType,
      assetAppId: campaign.assetDetails.assetAppId,
    },
    location: {
      ...campaign.assetDetails.assetLocation,
    },
    financialDetails: campaign.financialDetails,
    files: campaign.assetDetails.assetMediaFiles.map(
      ({ fileKey, fileName, filePath, fileId, isThumbnail }) => {
        return {
          fileId,
          fileKey,
          fileName,
          filePath,
          file: null,
          isThumbnail,
        };
      },
    ),
    seller: {
      _id: campaign.sellerId,
    },
    file: {},
    amenities: campaign.assetDetails.assetAmenities,
  };
};
