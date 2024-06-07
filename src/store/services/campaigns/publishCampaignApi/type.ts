export interface IpublishCampaignResponse {
  message?: string;
  data?: boolean;
  error?: string;
}

export interface IpublishCampaignRequist {
  campaignId: string;
  campaignPublishingTimestamp: string;
}
