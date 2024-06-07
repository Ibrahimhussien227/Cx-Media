import { IWrapperFormProps } from "../WrapperForm/type";

export interface IFormSectionProps {
  statusHandler: (
    residence: { residenceLen: number; max: number },
    funds: { fundsLen: number; max: number },
    wealth: { wealthLen: number; max: number },
    backgroundLen: number
  ) => void;
  step: number;
  data: IWrapperFormProps["investorDetails"];
  investorDropdown: IWrapperFormProps["investorDropdown"];
}

export type SubmitType = {
  residenceType?: string;
  addressLine1?: string;
  addressProofType?: string;
  relativeName?: string;
  files?: {
    fileId: string;
    file: null | File;
  }[];
  fundSource?: string;
  wealthSource?: string;
  investmentsExperience?: string;
  socialStatus?: string;
  employmentStatus?: string;
  employerName?: string;
  employerAddress?: string;
  countryOfEmployment?: string;
  jobTitle?: string;
  employmentIndustry?: string;
  annualSalaryRange?: string;
};

export type DirtyFieldTypes = {
  residenceType?: boolean;
  addressLine1?: boolean;
  addressProofType?: boolean;
  relativeName?: boolean;
  files?:
    | {
        fileId?: boolean | undefined;
        fileName?: boolean | undefined;
        file?: boolean | undefined;
        filePath?: boolean | undefined;
      }[]
    | undefined;
  fundSource?: boolean;
  wealthSource?: boolean;
  investmentsExperience?: boolean;
  socialStatus?: boolean;
  employmentStatus?: boolean;
  employerName?: boolean;
  employerAddress?: boolean;
  countryOfEmployment?: boolean;
  jobTitle?: boolean;
  employmentIndustry?: boolean;
  annualSalaryRange?: boolean;
};

export type countDataType = {
  residenceType?: string;
  addressLine1?: string;
  addressProofType?: string;
  relativeName?: string;
  files?: {
    fileId: string;
    file: null | File;
    filePath: string;
  }[];
  fundSource?: string;
  wealthSource?: string;
  investmentsExperience?: string;
  socialStatus?: string;
  employmentStatus?: string;
  employerName?: string;
  employerAddress?: string;
  countryOfEmployment?: string;
  jobTitle?: string;
  employmentIndustry?: string;
  annualSalaryRange?: string;
};
