export type IFile = {
  originalname?: string;
  awsFileName?: string;
  fileLink?: string;
  name?: string;
};

export interface IWealthProps {
  data: {
    sourceOfWealth: string;
    sourceOfWealthProof: IFile;
  };
  investorId: string;
}

export interface IFormData {
  wealthSource: string;
  wealthSourceProof: IFile | File;
}

export type IField = "wealthSource" | "wealthSourceProof";
