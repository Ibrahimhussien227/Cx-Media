import { UseFormReturn } from "react-hook-form";
import { IWrapperFormProps } from "../../WrapperForm/type";

export interface IFormBackgroundProps {
  investmentsExperience: string;
  socialStatus: string;
  employmentStatus: string;
  employerName: string;
  employerAddress: string;
  countryOfEmployment: string;
  jobTitle: string;
  employmentIndustry: string;
  annualSalaryRange: string;
}

export interface IBackgroundFormProps {
  hookForm: UseFormReturn<IFormBackgroundProps>;
  isLoading: boolean;
  applicationCompleted: boolean;
  investorDropdown: IWrapperFormProps["investorDropdown"];
}

export type fieldNames =
  | "investmentsExperience"
  | "socialStatus"
  | "employmentStatus"
  | "countryOfEmployment"
  | "employmentIndustry"
  | "annualSalaryRange";
