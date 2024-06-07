import { IFeeStructureResponse } from "@/store/services/campaigns/feeStructureApi/type";

export const DEFAULTVALUESFEESTRUCTURE = {
  dldTransferAndRegistrationFee: 0,
  trusteeFee: 0,
  titleDeedFee: 0,
  listingFee: 0,
  administrationFee: 0,
  propertyInsuranceFee: 0,
  valuationFee: 0,
  certificateOfIncumbencyFee: 0,
  difcSpvIncorporationFee: 0,
  difcNocFee: 0,
  serviceFee: 0,
  maintenanceAndPropertyManagementFee: 0,
  miscellaneousFee: 0,
  reserveForUtilitiesAndMaintenance: 0,
  acquisitionFee: 0,
  kycFee: 0,
  platformVAT: 0,
};

export const setValuesToObject = (
  data: IFeeStructureResponse["data"]["fee"]
) => {
  // Example usage:

  data.forEach((item) => {
    if (
      Object.prototype.hasOwnProperty.call(DEFAULTVALUESFEESTRUCTURE, item.key)
    ) {
      DEFAULTVALUESFEESTRUCTURE[
        item.key as keyof typeof DEFAULTVALUESFEESTRUCTURE
      ] = +item.value;
    }
  });
  return DEFAULTVALUESFEESTRUCTURE;
};
