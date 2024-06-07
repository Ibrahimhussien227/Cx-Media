import { IRepresentativeFormProps } from "./type";

export const defaultValue = (data: IRepresentativeFormProps["data"]) => {
  return {
    fullLegalName: data?.name,
    jobProfile: data?.jobProfile,
    officialEmail: data?.email,
    officialPhoneNumber: data?.phoneNumber,
    employmentProof: {
      fileName: data?.employmentProof?.fileName,
      filePath: data?.employmentProof?.filePath,
    },
  };
};
