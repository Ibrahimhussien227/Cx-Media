export interface ICampaignApplicationActionRequist {
  campaignId: string;
  reviewStatus: string;
}

export interface ICampaignApplicationActionResponse {
  data: {
    administrationLogId: string;
    campaignId: string;
    administrationType: string;
    administrationStatus: string;
    userId: string;
  };
}

export interface ICampaignActionResponse {
  campaignId: string;
  actions: string;
  days?: string;
}
