export interface ILoactionForm {
  propertyLocation: {
    assetLocationId: string;
    assetId: string;
    assetAddressOne: string;
    assetAddressTwo: string;
    assetCountry: string;
    assetCity: string;
    assetLocationArea: string;
    assetLocation: string;
    assetGeolocationLat: string;
    assetGeolocationLong: string;
    completionStatus: string;
  };
  campaignId: string;
}

export interface ILocationSubmitForm {
  assetAddressOne: string;
  assetAddressTwo: string;
  assetCountry: string;
  assetCity: string;
  assetLocationArea: string;
}
