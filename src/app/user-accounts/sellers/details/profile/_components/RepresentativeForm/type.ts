export type IFile = {
  fileName?: string;
  filePath?: string;
};

export interface IRepresentativeFormProps {
  data: {
    companyId: string;
    name: string;
    jobProfile: string;
    email: string;
    kycStatus: string;
    phoneNumber: string;
    countryCode: string;
    employmentProof: IFile;
  };
}

export interface IFormProps {
  fullLegalName: string;
  jobProfile: string;
  officialEmail: string;
  KYCstatus: string;
  officialPhoneNumber: string;
  countryCode: string;
  employmentProofFile: IFile | File;
}

export type IFields = "employmentProofFile";
