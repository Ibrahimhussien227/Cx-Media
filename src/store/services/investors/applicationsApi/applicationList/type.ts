export interface IGetInvestorApplicationListResponse {
  result: {
    investorId: string;
    applicationStatus: string;
    applicationCreationTimestamp: string;
    applicationUpdateTimestamp: string;
    applicationUpdatedBy: string;
    applicationId: string;
    userId: string;
  }[];
}

export interface IGetInvestorApplicationStatsResponse {
  result: {
    TOTAL: number;
    PENDING: number;
    VERIFIED: number;
    REJECTED: number;
  };
}
