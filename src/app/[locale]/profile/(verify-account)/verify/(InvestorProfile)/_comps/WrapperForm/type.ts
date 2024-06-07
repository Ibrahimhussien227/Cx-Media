export interface IWrapperFormProps {
  investorDetails: {
    profileCompletionStatus: string;
    address: {
      residenceType: string;
      addressLine1: string;
      addressProofType: string;
      friendRelativeName: string;
      friendRelativeProofDocument: {
        awsFileName: string;
        fileLink: string;
        originalname: string;
      };
      addressProofDocument: {
        originalname: string;
        awsFileName: string;
        fileLink: string;
      };
    };
    fundSource: string;
    wealthSource: string;
    employment: {
      employerName: string;
      employerAddress: string;
      countryOfEmployment: string;
      jobTitle: string;
      employmentIndustry: string;
      annualSalaryRange: string;
    };
    sourceOfFundsProof: {
      awsFileName: string;
      fileLink: string;
      originalname: string;
    };
    sourceOfFundsTransactionProof: {
      awsFileName: string;
      fileLink: string;
      originalname: string;
    };
    wealthSourceProof: {
      originalname: string;
      awsFileName: string;
      fileLink: string;
    };
    wealthSourceTransactionProof: {
      originalname: string;
      awsFileName: string;
      fileLink: string;
    };
    employmentStatus: string;
    socialStatus: string;
    investmentsExperience: string;
    applicationStatus: string;
    sourceOfFunds: string;
  };
  investorDropdown: {
    key: string;
    value: {
      [key: string]: string;
    }[];
  }[];
}
