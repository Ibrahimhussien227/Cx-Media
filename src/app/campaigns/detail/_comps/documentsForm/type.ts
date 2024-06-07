

export type namedFile = {
  name?: string;
  file: IAssetMediaFiles | File | null;
}

export type doxParams = {
  documentsAction: { fileId: string, action: 'DELETE' | 'EDIT' }[],
  [fieldName: string]: File | { fileId: string, action: 'DELETE' | 'EDIT' }[]
}

export type otherDoxParams = {
  otherDocuments?: File[],
  otherDocumentsParam?: {documentName: string, originalFileName: string}[],
  documentsAction?: { fileId: string, action: 'DELETE' | 'EDIT' }[];
}