export interface IAssetDetailsRequest {
  assetId: string;
  campaignId: string;
  body: {
    assetName?: string;
    assetDescription?: string;
    assetAppId?: string;
    assetArea?: number;
    numberOfBed?: number;
    numberOfBath?: number;
    assetInvestmentType?: string;
    assetType?: string;
  };
}

export interface IAssetLocationRequest {
  assetLocationId: string;
  campaignId: string;
  body: {
    assetAddressOne?: string;
    assetAddressTwo?: string;
    assetCountry?: string;
    assetCity?: string;
    assetLocationArea?: string;
  };
}

export interface IAssetUpdateFinancialRequest {
  financialId: string;
  campaignId: string;
  body: {
    propertyPrice?: number;
    projectedAnnualizedReturn?: number;
    projectedAnnualAppreciation?: number;
    projectedGrossYield?: number;
    projectedNetYield?: number;
  };
}

export interface IAssetCreateFinancialRequest {
  campaignId: string;
  body: {
    assetId: string;
    propertyPrice?: number;
    projectedAnnualizedReturn?: number;
    projectedAnnualAppreciation?: number;
    projectedGrossYield?: number;
    projectedNetYield?: number;
  };
}

export interface IAssetDocumentRequest {
  campaignId: string;
  body: FormData;
}

export interface IAssetAminityRequest {
  assetId: string;
  amenitiesNames: string[];
}

export interface IAssetMediaRequest {
  body: FormData;
}
