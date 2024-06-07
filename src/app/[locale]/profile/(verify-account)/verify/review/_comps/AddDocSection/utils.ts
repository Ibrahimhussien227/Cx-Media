import { AddDocSectionProps, IDocumentSubmitForm } from "./type";

export const defaultValue = (
  propertyDocumentse: AddDocSectionProps["investorDetails"]["otherDocuments"]
) => {
  return {
    otherDocuments: [
      ...propertyDocumentse.map(({ uploadedFileName }) => {
        return {
          file: uploadedFileName,
        };
      }),
    ],
    otherDocumentsParam: [
      ...propertyDocumentse.map(({ fileTitle, fileName }) => {
        return {
          documentName: fileTitle,
          originalFileName: fileName,
        };
      }),
    ],
  };
};

export const filterDocuments = (
  formeData: IDocumentSubmitForm,
  defaultValues: IDocumentSubmitForm
) => {
  // Helper function to check equality of file objects or URLs
  const isSameFile = (file1: string | File, file2: string | File): boolean => {
    if (typeof file1 === "string" && typeof file2 === "string") {
      return file1 === file2;
    }
    if (file1 instanceof File && file2 instanceof File) {
      return file1.name === file2.name;
    }
    return false;
  };

  // Filter out duplicates in otherDocuments
  const uniqueOtherDocuments1 = formeData.otherDocuments.filter(
    (doc1) =>
      !defaultValues.otherDocuments.some(
        (doc2) => doc1.file && doc2.file && isSameFile(doc1.file, doc2.file)
      )
  );

  // Filter out duplicates in otherDocumentsParam
  const uniqueOtherDocumentsParam1 = formeData.otherDocumentsParam.filter(
    (param1) =>
      !defaultValues.otherDocumentsParam.some(
        (param2) => param1.originalFileName === param2.originalFileName
      )
  );

  const formDataDocuments = new FormData();

  Object?.keys({
    otherDocuments: uniqueOtherDocuments1,
    otherDocumentsParam: uniqueOtherDocumentsParam1,
  })?.forEach((key) => {
    // Append each property to the FormData instance
    const value = formeData[key as keyof IDocumentSubmitForm];

    if (key === "otherDocumentsParam") {
      formDataDocuments.append(key, JSON?.stringify(formeData[key]));
    } else {
      (
        value as {
          file: File | null;
        }[]
      ).map(({ file }) => {
        if (file) {
          formDataDocuments.append("otherDocuments", file);
        }
      });
    }
  });

  return formDataDocuments;
};
