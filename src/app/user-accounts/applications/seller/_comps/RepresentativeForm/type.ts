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
    phoneNumber: string;
    countryCode: string;
    employmentProof: IFile;
  };
}

export interface IFormData {
  fullLegalName: string;
  jobProfile: string;
  officialEmail: string;
  officialPhoneNumber: string;
  employmentProof: IFile | File;
}

export type IFields = "employmentProof";
