export type IFile = {
  originalname?: string;
  awsFileName?: string;
  fileLink?: string;
  name?: string;
};

export interface IFundProps {
  data: {
    sourceOfFunds: string;
    sourceOfFundsProof: IFile;
  };
  investorId: string;
}

export interface IFormData {
  sourceOfFunds: string;
  sourceOfFundsProof: IFile | File;
}

export type IField = "sourceOfFunds" | "sourceOfFundsProof";
