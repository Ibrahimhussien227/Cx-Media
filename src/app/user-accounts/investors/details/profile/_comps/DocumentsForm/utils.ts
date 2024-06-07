import { getDirtyFields } from "@/utils/getDirtyFields";
import { IDocumentSubmitForm, IDocumentsFormProps } from "./type";

const emptyField = {
  fileName: "",
  filePath: "",
  fileKey: "",
  fileId: "",
  file: null,
};

export const defaultValue = (
  otherDocuments: IDocumentsFormProps["otherDocuments"],
) => {
  return {
    otherDocuments: otherDocuments
      ? [
          ...(otherDocuments.filter(
            ({ fileKey }: { fileKey: string }) => fileKey === "otherDocuments",
          ) ?? emptyField),
        ]
      : [],
    otherDocumentsParam: [],
    documentsAction: [],
  };
};

export const handleFormData = <
  TData extends Record<keyof TDirtyItems, unknown>,
  TDirtyItems extends Record<string, unknown>,
>(
  assetId: string,
  investorId: string,
  formData: TData,
  dirtyFields: TDirtyItems,
) => {
  const body = new FormData();
  body.append("investorId", investorId);
  //   body.append("assetId", assetId);
  Object.keys(getDirtyFields(formData, dirtyFields)).forEach((key) => {
    const value = getDirtyFields(formData, dirtyFields)[
      key as keyof IDocumentSubmitForm
    ];

    if (key === "otherDocuments") {
      (
        value as {
          fileId: string;
          file: File | null;
        }[]
      )
        .filter((item) => !item.fileId && item.file !== null)
        .map(({ file }) => {
          if (file) {
            body.append("otherDocuments", file);
          }
        });
    } else if (key === "documentsAction") {
      const documentsActionValue = value as {
        fileId: string;
        action: string;
      }[];
      body.append("documentsAction", JSON.stringify(documentsActionValue));
    } else if (key === "otherDocumentsParam") {
      const otherDocumentsParamValue = value as {
        documentName: string;
        originalFileName: string;
      }[];
      body.append(
        "otherDocumentsParam",
        JSON.stringify(otherDocumentsParamValue),
      );
    }
  });
  return body;
};
