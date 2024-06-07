export type IFile = {
  fileName?: string;
  filePath?: string;
};

export interface ICompanyDetailsProps {
  data: {
    companyId: string;
    companyName: string;
    numOfEmployee: number;
    taxId: string;
    taxCertification: IFile;
    registerationLincense: IFile;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    country: string;
    city: string;
  };
}

export interface IFormProps {
  companyName: string;
  numOfEmployees: number;
  companyTaxId: string;
  taxCertificateFile: IFile | File;
  tradeLicenseFile: IFile | File;
  companyAddress_1: string;
  companyAddress_2: string;
  postalCode: string;
  country: string;
  city: string;
}

export type IFields = "tradeLicenseFile" | "taxCertificateFile";
