export interface IGetInvestorListResponse {
  result: {
    userId: string;
    emailId: string;
    mobileNumber: string;
    profileStatus: string;
    accountId: string;
    profile: {
      profileCompletionStatus: string;
      registrationTimestamp: string;
      lastUpdateTimestamp: string;
      kycStatus: string;
      IsBankDetailsUpdated: string;
      investorType: string;
      accountName: string;
    };
  }[];
}
export interface IGetInvestorStatsResponse {
  result: {
    investorsByType: { count: string; investor_type: string }[];
  };
}
