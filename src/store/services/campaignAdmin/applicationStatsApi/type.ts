export interface IGetApplicationStatsResponse {
  data: {
    DRAFT: number;
    PENDING_REVIEW: number;
    PENDING_FEE: number;
    REJECTED: number;
    APPROVED_TO_PUBLISH: number;
  };
}
