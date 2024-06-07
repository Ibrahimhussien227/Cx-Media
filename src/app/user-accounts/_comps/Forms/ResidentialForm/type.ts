export type IFile = {
  originalname?: string;
  awsFileName?: string;
  fileLink?: string;
  name?: string;
};

export interface IResidentialProps {
  data: {
    residentialType: string;
    address: string;
    country: string;
    city: string;
    addressProofType: string;
    addressProof: IFile;
    relativeName: string;
    relativeId: IFile;
  };
  investorId: string;
}

export interface IFormData {
  residenceType: string;
  addressLine1: string;
  country: string;
  city: string;
  addressProofType: string;
  addressProofDocument: IFile | File;
  friendRelativeName: string;
  friendRelativeProofDocument: IFile | File;
}

export type IField = "addressProofDocument" | "friendRelativeProofDocument";
