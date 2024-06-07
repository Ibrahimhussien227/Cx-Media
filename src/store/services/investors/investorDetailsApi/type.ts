export interface IPatchInvestorActionRequest {
  investorId: string;
  status: string;
}

export interface IUpadeInvestorRequest {
  body: FormData;
}

type IFile = {
  originalname: string;
  awsFileName: string;
  fileLink: string;
};

export interface IInvestorDetailsData {
  result: {
    investorId: string;
    accountName: string;
    investorType: string;
    isNetAssetAboveOneMillion: boolean;
    isExperienceInFinancialMarkets: boolean;
    isInvestedInStocks: boolean;
    isInvestedInRealEstate: boolean;
    IsInvestedInEnterprise: boolean;
    IsBankDetailsUpdated: boolean;
    isAddressProofUpdated: boolean;
    kycStatus: string;
    wealthSource: string;
    wealthSourceProof: IFile;
    socialStatus: string;
    profileCompletionStatus: string;
    profileRejectionReason: string;
    applicationStatus: string;
    applicationCreationTimestamp: string;
    applicationId: string;
    investmentsExperience: string;
    creditRisk: string;
    sourceOfFunds: string;
    sourceOfFundsProof: IFile;
    employmentStatus: string;
    registrationTimestamp: string;
    lastUpdateTimestamp: string;
    userId: string;
    birthCertificate: string;
    deathCertificate: string;
    user: {
      userId: string;
      isActive: boolean;
      isBlocked: boolean;
      emailId: string;
      fullName: string;
      countryCode: string;
      mobileNumber: string;
      sellerId: string;
      investorId: string;
      updatedAt: string;
    };
    address: {
      addressId: string;
      residenceType: string;
      addressLine1: string;
      country: string;
      city: string;
      addressProofType: string;
      addressProofDocument: IFile;
      friendRelativeName: string;
      friendRelativeProofDocument: IFile;
      createdAt: string;
      updatedAt: string;
      investorId: string;
    };
    employment: {
      employeeDetailId: string;
      employerName: string;
      employerAddress: string;
      countryOfEmployment: string;
      jobTitle: string;
      employmentIndustry: string;
      annualSalaryRange: string;
      createdAt: string;
      updatedAt: string;
      investorId: string;
    };
    otherDocuments: [];
  };
}
