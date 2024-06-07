interface IOption {
  value: string;
  display: string;
  sortOrder?: string;
}

interface ISearchParamsProps {
  searchParams: { [key: string]: string };
}

interface ICampaignData {
  data: {
    campaignState?: string;
    campaignId: string;
    assetDetails: {
      assetMediaFiles: { filePath: string; fileKey: string }[];
      assetName: string;
      assetLocation: {
        assetGeolocationLat: string;
        assetGeolocationLong: string;
        assetAddressOne: string;
        assetCity: string;
        assetLocationArea: string;
      };
    };
    campaignStatus: string;
    financialDetails: {
      sharePrice?: number;
      propertyPrice: number;
      noOfShares: number;
      minimumInvestmentAmount: number;
      minimumInvestmentShare: number;
      noOfSharesRemaining: number;
      projectedAnnualAppreciation: number;
      projectedAnnualizedReturn: number;
      projectedGrossYield: number;
      projectedNetYield: number;
      numberOfInvestors: number;
    };
  };
}
