export interface IDataCellsCampaigns {
  data: {
    asset: {
      name: string;
      id: string;
      assetMediaFiles: { filePath: string; fileKey: string }[];
    };
    noOfShares: {
      remaining: number;
      total: number;
    };
    propertyPrice: number;
    projectedAnnualizedReturn: number;
    projectedAnnualAppreciation: number;
    projectedGrossYield: number;
    projectedNetYield: number;
    minimumInvestment: {
      amount: number;
      shares: number;
    };
  };
}
