export interface ICampaignFeeFormProps {
  propertyFee: {
    dldTransferAndRegistrationFee: number;
    trusteeFee: number;
    titleDeedFee: number;
    listingFee: number;
    administrationFee: number;
    propertyInsuranceFee: number;
    valuationFee: number;
    certificateOfIncumbencyFee: number;
    difcSpvIncorporationFee: number;
    difcNocFee: number;
    serviceFee: number;
    maintenanceAndPropertyManagementFee: number;
    miscellaneousFee: number;
    reserveForUtilitiesAndMaintenance: number;
    acquisitionFee: number;
    kycFee: number;
    platformVAT: number;
  };
  feeStructureId: string;
}

export type KEYSFORFORM =
  | "dldTransferAndRegistrationFee"
  | "trusteeFee"
  | "titleDeedFee"
  | "listingFee"
  | "administrationFee"
  | "propertyInsuranceFee"
  | "valuationFee"
  | "certificateOfIncumbencyFee"
  | "difcSpvIncorporationFee"
  | "difcNocFee"
  | "serviceFee"
  | "maintenanceAndPropertyManagementFee"
  | "miscellaneousFee"
  | "reserveForUtilitiesAndMaintenance"
  | "acquisitionFee"
  | "kycFee"
  | "platformVAT";
