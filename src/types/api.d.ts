const {
  campaignStatus,
  campaignStates,
  TelrSessionTypes
} = import("./enum.constants");

interface IGenericResponse {
  message: string;
}

interface IListQueryResp<Tdata> {
  count: number;
  data: Tdata[];
  message: string;
}

interface IUpdateSellerRequest {
  id: string;
  data: FormData;
}

interface ICampaignListQueryParams {
  searchValue?: string;
  sortBy?: string;//'campaignCreationTimestamp' | 'propertyPrice' | 'projectedAnnualizedReturn' | 'projectedAnnualAppreciation' | 'projectedNetYield' | 'projectedGrossYield';
  sortOrder?: 'ASC' | 'DESC';
  campaignStatus?: campaignStatus;
  campaignState?: campaignStates;
}

interface ICampaignConfig {
  configKey: string;
  configValue: string; // what to display on the UI
  configType: string,
}
 
interface ISupportTicketParams {
  subject: string;
  message: string;
}

interface ITelrSessionParams {
  campaignId?: string;
  sessionType: TelrSessionTypes,
  callBackUrls: {
    authorised: string;
    declined: string;
    cancelled: string;
  }
}
