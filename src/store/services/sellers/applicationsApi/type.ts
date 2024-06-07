export interface IGetSellerAppLicationListResponse {
  data: {
    applicationReviewStatus: string;
    accountCreationDate: string;
    lastUpdateTimestamp: string;
    updatedBy: string;
    applicationId: string;
    userId: string;
    sellerId: string;
    sellerType: string;
  }[];
}

export interface IPatchSellerStatusRequest {
  sellerId: string;
  applicationReviewStatus: string;
}

export interface IGetSellerStatsResponse {
  data: {
    DRAFT: number;
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
    TOTAL: number;
  };
}
