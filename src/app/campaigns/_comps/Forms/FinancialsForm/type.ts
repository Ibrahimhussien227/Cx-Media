export interface IFinancialsFormProps {
  propertyFinancials: {
    propertyPrice: number;
    projectedAnnualizedReturn: number;
    projectedAnnualAppreciation: number;
    projectedGrossYield: number;
    projectedNetYield: number;
    completionStatus: string;
    financialId: string;
  };
  campaignId: string;
  assetId: string;
}

export interface IFinancialsSubmitForm {
  propertyPrice: number;
  projectedAnnualizedReturn: number;
  projectedAnnualAppreciation: number;
  projectedGrossYield: number;
  projectedNetYield: number;
}
