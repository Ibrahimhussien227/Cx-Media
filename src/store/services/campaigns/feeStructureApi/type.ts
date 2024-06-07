export interface IFeeStructureResponse {
  data: {
    fee: {
      key: string;
      value: string;
    }[];

    feeStructureId: string;
  };
}

export interface d {
  data: {
    fee: {
      key: string;
      value: string;
    }[];
  };
}

export interface IFeeStructureRequest {
  campaignId: string;
}

export interface IUpdateFeeStructureRequest {
  feeStructureId: string;
  body: {
    dldTransferAndRegistrationFee?: number;
    trusteeFee?: number;
    titleDeedFee?: number;
    listingFee?: number;
    administrationFee?: number;
    propertyInsuranceFee?: number;
    valuationFee?: number;
    certificateOfIncumbencyFee?: number;
    difcSpvIncorporationFee?: number;
    difcNocFee?: number;
    serviceFee?: number;
    maintenanceAndPropertyManagementFee?: number;
    miscellaneousFee?: number;
    reserveForUtilitiesAndMaintenance?: number;
    acquisitionFee?: number;
    kycFee?: number;
    platformVAT?: number;
  };
}
