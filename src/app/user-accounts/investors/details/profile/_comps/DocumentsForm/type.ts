export interface IDocumentSubmitForm {
  documentsAction: { fileId: string; action: string }[];
  otherDocuments: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  }[];
  otherDocumentsParam: { documentName: string; originalFileName: string }[];
}

export interface IDocumentsFormProps {
  otherDocuments: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  }[];
  campaignId: string;
  assetId: string;
}

export interface IDocumentsProps {
  data: {
    otherDocuments: {
      fileId: string;
      fileName: string;
      filePath: string;
      fileKey: string;
      file: File | null;
    }[];
  };
  investorId: string;
  // assetId: string;
}
