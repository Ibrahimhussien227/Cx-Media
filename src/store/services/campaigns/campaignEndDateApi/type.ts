export interface IGetCamapignEndDateResponse {
  data: {
    campaignCloseTimestamp: string;
  };
}

export interface IGetCamapignEndDateRequest {
  campaignPublishingTimestamp: string;
}
