interface IOption {
  value: string;
  display: string;
  sortOrder?: "ASC" | "DESC";
}

interface IAction {
  title: string;
  status?: string;
  icon?: string;
  handler?: (id?: string) => void;
}

interface IHeadCell {
  key: string;
  label: string;
}

type ISearchParamsProps = { [key: string]: string };

interface IAllCampaign {
  campaignId: string;
  assetId: string;
  sellerId: string;
  financialId: null;
  campaignStatus: string;
  campaignState: string;
  reviewStatus: string;
  campaignCreationTimestamp: string;
  campaignApproveTimestamp: string;
  campaignPublishingTimestamp: string;
  campaignCloseTimestamp: string;
  campaignExitTimestamp: string;
  updatedAt: string;
  updatedBy: string;
  assetDetails: {
    assetId: string;
    assetName: string;
    assetDescription: string;
    assetAppId: string;
    assetArea: number;
    numberOfBed: number;
    numberOfBath: number;
    completionStatus: string;
    assetMediaFiles: {
      fileId: string;
      fileKey: string;
      fileName: string;
      filePath: string;
      otherDocumentName?: string;
    }[];
    assetAmenities: [];
    assetInvestmentType: string;
    assetType: string;
  };
  financialDetails: {
    financialId: string;
    fundingTimeline: string;
    propertyPrice: number;
    sharePrice: number;
    noOfShares: number;
    noOfSharesSold: number;
    noOfSharesRemaining: number;
    minimumInvestmentAmount: number;
    minimumInvestmentShare: number;
    projectedAnnualizedReturn: number;
    projectedAnnualAppreciation: number;
    projectedGrossYield: number;
    projectedNetYield: number;
    numberOfInvestors: number;
    fundsRaised: number;
    campaignFundingStatusTracker: string;
    lastUpdateTimestamp: string;
    completionStatus: string;
  };

  campaignAdministrationLogs: [];
}

interface ISingleCampaign {
  campaignId: string;
  assetId: string;
  sellerId: string;
  financialId: null;
  campaignStatus: string;
  campaignState: string;
  reviewStatus: string;
  campaignCreationTimestamp: string;
  campaignApproveTimestamp: string;
  campaignPublishingTimestamp: string;
  campaignCloseTimestamp: string;
  campaignExitTimestamp: string;
  updatedAt: string;
  updatedBy: string;
  assetDetails: {
    assetId: string;
    assetName: string;
    assetDescription: string;
    assetAppId: string;
    assetArea: number;
    numberOfBed: number;
    numberOfBath: number;
    completionStatus: string;
    assetMediaFiles: {
      isThumbnail: boolean;

      fileId: string;
      fileKey: string;
      fileName: string;
      filePath: string;
      otherDocumentName?: string;
    }[];
    assetAmenities: [];
    assetInvestmentType: string;
    assetType: string;
    assetLocation: {
      assetLocationId: string;
      assetAddressOne: string;
      assetAddressTwo: string;
      assetCountry: string;
      assetCity: string;
      assetLocationArea: string;
      assetLocation: string;
      assetGeolocationLat: string;
      assetGeolocationLong: string;
      assetId: string;
      completionStatus: string;
    };
  };
  financialDetails: {
    financialId: string;
    fundingTimeline: string;
    propertyPrice: number;
    sharePrice: number;
    noOfShares: number;
    noOfSharesSold: number;
    noOfSharesRemaining: number;
    minimumInvestmentAmount: number;
    minimumInvestmentShare: number;
    projectedAnnualizedReturn: number;
    projectedAnnualAppreciation: number;
    projectedGrossYield: number;
    projectedNetYield: number;
    numberOfInvestors: number;
    fundsRaised: number;
    campaignFundingStatusTracker: string;
    lastUpdateTimestamp: string;
    completionStatus: string;
  };

  campaignAdministrationLogs: [];
}

interface IPaymentManager {
  _id: string;
  key: string;
  value: string;
  type: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
}
