export interface IPropertyDetailsSection {
  assetDetails: {
    assetArea: string;
    numberOfBed: string;
    numberOfBath: string;
    assetDescription: string;
    assetLocation: {
      assetCity: string;
      assetCountry: string;
      assetLocationArea: string;
      assetGeolocationLat: string;
      assetGeolocationLong: string;
    };
    assetAmenities: {
      amenitiesId: string;
      amenitiesName: string;
    }[];
  };
}
