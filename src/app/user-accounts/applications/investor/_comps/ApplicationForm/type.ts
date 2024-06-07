export type IFile = {
  originalname?: string;
  awsFileName?: string;
  fileLink?: string;
  name?: string;
};

export interface IApplicationFormProps {
  investorDetails: {
    application: { _id: string; status: string };
    identity: {
      name: string;
      email: string;
      phoneNumber: string;
      countryCode: string;
    };
    kycStatus: { kycVerify: boolean; kycStatus: string };
    residentialAddress: {
      residentialType: string;
      address: string;
      country: string;
      city: string;
      addressProofType: string;
      addressProof: IFile;
      relativeName: string;
      relativeId: IFile;
    };
    fundSource: { sourceOfFunds: string; sourceOfFundsProof: IFile };
    wealthSource: { sourceOfWealth: string; sourceOfWealthProof: IFile };
    investorBackground: {
      investmentsExperience: string;
      socialStatus: string;
      creditRisk: string;
      employmentStatus: string;
      employerName: string;
      employerAddress: string;
      countryOfEmployment: string;
      jobTitle: string;
      employmentIndustry: string;
      annualSalaryRange: string;
    };
    otherDocuments: { otherDocuments: [] };
    other: {
      investorId: string;
      accountLevel: string;
      profileStatus: string;
    };
  };
}
