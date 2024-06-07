import { getDirtyFields } from "@/utils/getDirtyFields";
import {
  DirtyFieldTypes,
  IFormSectionProps,
  SubmitType,
  countDataType,
} from "./type";
import { IWrapperFormProps } from "../WrapperForm/type";

export const findFileByFileId = (
  files: {
    fileId: string;
    file: File | null;
    filePath?: string;
    fileName?: string;
  }[],
  fileId: string
) => {
  return files.find((file) => file.fileId === fileId);
};

export const getDefaultValues = (data: IFormSectionProps["data"]) => {
  return {
    residenceType: data.address?.residenceType,
    addressLine1: data.address?.addressLine1,
    addressProofType: data.address?.addressProofType,
    friendRelativeName: data.address?.friendRelativeName,
    files: [
      {
        fileId: "addressProofDocument",
        fileName: data.address?.addressProofDocument?.originalname,
        file: null,
        filePath: data.address?.addressProofDocument?.fileLink,
      },
      {
        fileId: "friendRelativeProofDocument",
        fileName: data.address?.friendRelativeProofDocument?.originalname,
        file: null,
        filePath: data?.address?.friendRelativeProofDocument?.fileLink,
      },
      {
        fileId: "wealthSourceProof",
        fileName: data.wealthSourceProof?.originalname,
        file: null,
        filePath: data?.wealthSourceProof?.fileLink,
      },
      {
        fileId: "sourceOfFundsProof",
        fileName: data.sourceOfFundsProof?.originalname,
        file: null,
        filePath: data?.sourceOfFundsProof?.fileLink,
      },
      {
        fileId: "sourceOfFundsTransactionProof",
        fileName: data.sourceOfFundsTransactionProof?.originalname,
        file: null,
        filePath: data?.sourceOfFundsTransactionProof?.fileLink,
      },
      {
        fileId: "wealthSourceTransactionProof",
        fileName: data.wealthSourceTransactionProof?.originalname,
        file: null,
        filePath: data?.wealthSourceTransactionProof?.fileLink,
      },
    ],
    sourceOfFunds: data.sourceOfFunds,
    wealthSource: data?.wealthSource,
    investmentsExperience: data.investmentsExperience,
    socialStatus: data.socialStatus,
    employmentStatus: data.employmentStatus,
    employerName: data.employment?.employerName,
    employerAddress: data.employment?.employerAddress,
    countryOfEmployment: data.employment?.countryOfEmployment,
    jobTitle: data.employment?.jobTitle,
    employmentIndustry: data.employment?.employmentIndustry,
    annualSalaryRange: data.employment?.annualSalaryRange,
  };
};

export const countNonEmptyValues = (data: countDataType, keys: string[]) => {
  let count = 0;

  keys.forEach((key) => {
    if (
      data[key as keyof countDataType] !== "" &&
      data[key as keyof countDataType] !== null &&
      data[key as keyof countDataType] !== undefined
    ) {
      count++;
    } else {
      data?.files?.map(({ fileId, filePath, file }) => {
        if (fileId === key && (filePath || file !== null)) {
          count++;
        }
      });
    }
  });

  return count;
};

export const handleFormData = (
  data: SubmitType,
  dirtyFields: DirtyFieldTypes
  // type?: string
) => {
  const formData = new FormData();
  formData.append("isResidenceUpdate", "true");
  formData.append("isEmploymentUpdate", "true");

  const filteredObj = {
    ...data,
    files:
      data.files?.filter(
        (fileObj: { file: null | File }) => fileObj.file !== null
      ) ?? [],
  };

  for (const key in getDirtyFields(
    filteredObj as Record<keyof DirtyFieldTypes, unknown>,
    dirtyFields
  )) {
    if (key !== "files") {
      formData.append(key, (data as Record<string, string>)[key]);
    } else {
      const files = data[key] as {
        fileId: string;
        file: null | File;
        filePath: string;
      }[];
      files.forEach((fileObj) => {
        if (fileObj.file) {
          formData.append(fileObj.fileId, fileObj.file);
        }
      });
    }
  }

  return formData;
};

export const investorFilterDropdown = (
  data: IWrapperFormProps["investorDropdown"],
  key: string
) => {
  const value = data?.find((obj) => obj.key === key)?.value ?? {};

  return Object?.entries(value as { [key: string]: string }[])?.map(
    ([key, value]) => ({
      value: key,
      display: value?.toString(),
    })
  );
};
