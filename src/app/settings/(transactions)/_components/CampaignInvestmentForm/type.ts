export interface ICampaignInvestmentFormsProps {
  campaignInvestment: { [key: string]: IPaymentManager };
}

export interface ICampaignInvestment {
  dldTransferAndRegistrationFee: string;
  trusteeFee: string;
  titleDeedFee: string;
  brokerageAgencyFee: string;
  administrationFee: string;
  propertyInsuranceFee: string;
  valuationFee: string;
  certificateOfIncumbencyFee: string;
  difcSpvIncorporationFee: string;
  difcNocFee: string;
  serviceFee: string;
  maintenanceAndPropertyManagementFee: string;
  miscellaneousFee: string;
  reserveForUtilitiesAndMaintenance: string;
  acquisitionFee: string;
  platformVAT: string;
}
