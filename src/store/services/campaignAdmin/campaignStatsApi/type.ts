export interface IGetCampaignStatsResponse {
  data: {
    UNPUBLISHED: number;
    SCHEDULED: number;
    AVAILABLE: number;
    FUNDED: number;
    EXITED: number;
  };
}
