export interface IAccountDetailsProps {
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

export interface IAccountSubmitForm {
  fullName: string;
  email: string;
  roleId: string;
}
