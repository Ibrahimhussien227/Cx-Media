

export interface ICompanyRepFormProps {
  formData: Partial<ICompanyRepresentativeDetails> & {
    employmentProofFile?: IAssetMediaFiles | File | null;
  };
  dispatchFormAction: React.Dispatch<{
    type: string;
    payload: string | number | File | null;
  }>;
  readOnly?: boolean;
}