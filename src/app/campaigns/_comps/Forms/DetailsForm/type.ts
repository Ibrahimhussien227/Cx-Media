export interface IDetailsFormProps {
  propertyDetails: {
    _id: string;
    assetAppId: string;
    name: string;
    investmentType: string;
    propertyType: string;
    area: number;
    noOfBed: number;
    noOfBath: number;
    description: string;
    completionStatus: string;
  };
  campaignId: string;
}

export interface IDetailSubmitForm {
  assetAppId: string;
  assetName: string;
  assetInvestmentType: string;
  assetType: string;
  assetArea: number;
  numberOfBath: number;
  numberOfBed: number;
  assetDescription: string;
}
