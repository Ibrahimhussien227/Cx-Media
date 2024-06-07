

interface ICompanyInfoFormProps  {
  formData: Partial<ICompanyDetails> & {
    tradeLicenseFile?: IAssetMediaFiles | File | null;
    taxCertificateFile?: IAssetMediaFiles | File | null;
  };
  dispatchFormAction?: React.Dispatch<{
    type: string;
    payload: string | number | File | null;
  }>;
  readOnly?: boolean;
}