type IFile = {
  fileName: string;
  filePath: string;
};

export interface IPatchSellerDetailsRequest {}

export interface ISellerDetailsResponse {
  data: {
    sellerId: string;
    userId: string;
    sellerType: string;
    kycStatus: string;
    sellerName: string;
    lastUpdateTimestamp: string;
    accountCreationDate: string;
    isBankDetailsUpdated: boolean;
    primaryBankDetails: null;
    numOfCampaignManagers: number;
    isRegistrationFeePaid: boolean;
    registration: null;
    submittedOn: string;
    updatedBy: string;
    applicationId: string;
    applicationReviewStatus: string;
    userDetails: {
      userId: string;
      fullName: string;
      emailId: string;
      isActive: boolean;
      isBlocked: boolean;
      UpdatedAt: string;
      mobileNumber: string;
    };
    companyDetails: {
      companyId: string;
      companyName: string;
      isRegistrationLicenseUploaded: boolean;
      companyAddress_1: string;
      companyAddress_2: string;
      postalCode: string;
      city: string;
      country: string;
      companyTaxId: string;
      isTaxCertificateUploaded: boolean;
      numOfEmployees: number;
      sellerId: string;
      companyRepresentativeDetails: {
        representativeId: string;
        companyId: string;
        fullLegalName: string;
        jobProfile: string;
        employmentLetterUploaded: null;
        identityProofUploaded: null;
        isEmploymentProofUploaded: boolean;
        officialEmail: string;
        officialPhoneNumber: string;
        countryCode: string;
        employmentProof: IFile;
      };
    };
    mediaFiles: {
      fileId: string;
      fileKey: string;
      fileName: string;
      filePath: string;
      fileType: string;
      fileSize: number;
      description: string;
      sellerId: string;
      uploadTimestamp: string;
      createdAt: string;
    }[];
  };
}
