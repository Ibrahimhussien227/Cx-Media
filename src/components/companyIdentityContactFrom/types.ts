

export interface ICompanyIdentityContactFroms {
  formData: Partial<ICompanyRepresentativeDetails> & {
    userPhoto?: string | null;
  };
  readOnly?: boolean;
}