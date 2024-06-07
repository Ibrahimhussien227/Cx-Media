export interface IGetCampaignAdminResponse {
  message: string;
  data: {
    campaignId: string;
    assetId: string;
    sellerId: string;
    financialId: string;
    campaignStatus: string;
    campaignState: string;
    reviewStatus: string;
    campaignCreationTimestamp: string;
    campaignApproveTimestamp: string;
    campaignPublishingTimestamp: string;
    campaignCloseTimestamp: string;
    campaignExitTimestamp: string;
    updatedAt: string;
    updatedBy: string;
    campaignAdministrationLogs: {
      administrationStatus: string;
      createdAt: string;
      userId: string;
    }[];
  };
}

export interface IGetCampaignRequistParams {
  campaignId: string;
  administrationType: string;
}
