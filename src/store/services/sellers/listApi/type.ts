export interface IGetSellersListResponse {
  data: {
    sellerId: string;
    sellerType: string;
    kycStatus: string;
    sellerName: string;
    lastUpdateTimestamp: string;
    accountCreationDate: string;
    applicationId: string;
    userDetails: {
      userId: string;
      fullName: string;
      emailId: string;
      isActive: boolean;
      isBlocked: boolean;

      mobileNumber: string;
    };
    profileStatus: string;
  }[];
}

export interface IGetSellerApplicationStatsResponse {
  data: {
    REGISTERED: number;
    INDIVIDUAL: number;
    BUSINESS: number;
    TOTAL: number;
  };
}
