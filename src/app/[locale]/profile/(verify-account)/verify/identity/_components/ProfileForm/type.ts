export interface ProfileFormProps {
  kycData: {
    profilePicture: string;
    kycDoc: string;
    metaData: {
      verification_data: {
        document: {
          dob: string;
          document_number: string;
          name: {
            first_name: string;
            last_name: string;
          };
          selected_type: string;
          full_address: string;
          country: string;
        };
      };
    };
  };
}
