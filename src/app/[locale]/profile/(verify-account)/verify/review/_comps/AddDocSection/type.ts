export interface AddDocSectionProps {
  actionRequiredStatus: boolean;
  activeDocuments: boolean;
  investorDetails: {
    applicationStatus: string;
    otherDocuments: {
      uploadedFileName: string;
      fileTitle: string;
      fileName: string;
    }[];
  };
}

export interface IDocumentSubmitForm {
  otherDocumentsParam: { documentName: string; originalFileName: string }[];
  otherDocuments: {
    file: File | null | string;
  }[];
}
