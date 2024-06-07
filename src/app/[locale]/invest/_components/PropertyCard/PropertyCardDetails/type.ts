export interface IPropertyCardDetailsProps {
  isOpen: boolean;
  data: {
    campaignId: string;
    assetDetails: {
      assetMediaFiles: { filePath: string }[];
      assetName: string;
    };
    campaignStatus: string;
    financialDetails: {
      propertyPrice: number;
      noOfShares: number;
      minimumInvestmentAmount: number;
      minimumInvestmentShare: number;
      noOfSharesRemaining: number;
      projectedAnnualAppreciation: number;
      projectedAnnualizedReturn: number;
      projectedGrossYield: number;
      projectedNetYield: number;
    };
  };
}
