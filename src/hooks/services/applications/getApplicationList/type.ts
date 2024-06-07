export interface IParams {
  page?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: string;
  accountId?: string;
  applicationType?: string;
  applicationStatus?: string;
  applicationId?: string;
  submittedOn?: string;
  lastUpdate?: string;
  updatedBy?: string;
}

export interface IGetInvestorsAppStats {
  TOTAL?: number;
  PENDING?: number;
  VERIFIED?: number;
  REJECTED?: number;
}
