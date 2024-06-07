export interface IDocumentsFormProps {
  propertyDocuments: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  }[];
  campaignId: string;
  assetId: string;
}
export interface IDocumentSubmitForm {
  titleDeedFile: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  };
  valuationReportFile: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  };
  rentalContractsFile: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  };
  projectionReportFile: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  };
  investorMemoFile: {
    fileId: string;
    fileName: string;
    filePath: string;
    fileKey: string;
    file: File | null;
  };
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

export type TFileKey =
  | "titleDeedFile"
  | "valuationReportFile"
  | "rentalContractsFile"
  | "projectionReportFile"
  | "investorMemoFile";
