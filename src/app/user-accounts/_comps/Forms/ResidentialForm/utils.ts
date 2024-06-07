import { IResidentialProps } from "./type";

export const defaultValue = (data: IResidentialProps["data"]) => {
  return {
    residenceType: data?.residentialType,
    addressLine1: data?.address,
    country: data?.country,
    city: data?.city,
    addressProofType: data?.addressProofType,
    addressProofDocument: data?.addressProof,
    friendRelativeName: data?.relativeName,
    friendRelativeProofDocument: data?.relativeId,
  };
};
