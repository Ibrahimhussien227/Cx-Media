import { ICompanyDetailsProps } from "./type";

export const defaultValue = (data: ICompanyDetailsProps["data"]) => {
  return {
    companyName: data?.companyName,
    numOfEmployees: data?.numOfEmployee,
    companyTaxId: data?.taxId,
    taxCertificateFile: {
      fileName: data?.taxCertification?.fileName,
      filePath: data?.taxCertification?.filePath,
    },
    tradeLicenseFile: {
      fileName: data?.registerationLincense?.fileName,
      filePath: data?.registerationLincense?.filePath,
    },
    companyAddress_1: data?.addressLine1,
    companyAddress_2: data?.addressLine2,
    postalCode: data?.postalCode,
    country: data?.country,
    city: data?.city,
  };
};
