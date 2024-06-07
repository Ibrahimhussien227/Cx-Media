import { IBackgroundProps } from "./type";

export const defaultValue = (data: IBackgroundProps["data"]) => {
  return {
    investmentsExperience: data?.investmentsExperience,
    socialStatus: data?.socialStatus,
    creditRisk: data?.creditRisk,
    employmentStatus: data?.employmentStatus,
    employerName: data?.employerName,
    employerAddress: data?.employerAddress,
    countryOfEmployment: data?.countryOfEmployment,
    jobTitle: data?.jobTitle,
    employmentIndustry: data?.employmentIndustry,
    annualSalaryRange: data?.annualSalaryRange,
  };
};
