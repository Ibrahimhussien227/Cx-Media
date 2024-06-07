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
  propertyDocumentse: IDocumentsFormProps["propertyDocuments"],
) => {
  const getValuesByKey = (key: string) =>
    propertyDocumentse.find(
      ({ fileKey }: { fileKey: string }) => fileKey === key,
    );

  return {
    titleDeedFile: getValuesByKey("titleDeedFile") ?? emptyField,
    investorMemoFile: getValuesByKey("investorMemoFile") ?? emptyField,
    valuationReportFile: getValuesByKey("valuationReportFile") ?? emptyField,
    rentalContractsFile: getValuesByKey("rentalContractsFile") ?? emptyField,
    projectionReportFile: getValuesByKey("projectionReportFile") ?? emptyField,
    otherDocuments: [
      ...(propertyDocumentse.filter(
        ({ fileKey }: { fileKey: string }) => fileKey === "otherDocuments",
      ) ?? emptyField),
    ],
    otherDocumentsParam: [],
    documentsAction: [],
  };
};

export const handleFormData = <
  TData extends Record<keyof TDirtyItems, unknown>,
  TDirtyItems extends Record<string, unknown>,
>(
  assetId: string,
  formData: TData,
  dirtyFields: TDirtyItems,
) => {
  const body = new FormData();
  body.append("assetId", assetId);
  Object.keys(getDirtyFields(formData, dirtyFields)).forEach((key) => {
    const value = getDirtyFields(formData, dirtyFields)[
      key as keyof IDocumentSubmitForm
    ];

    if (key === "titleDeedFile") {
      const titleDeedFile = (value as { file: File })?.file;
      body.append("titleDeedFile", titleDeedFile);
    } else if (key === "investorMemoFile") {
      const investorMemoFile = (value as { file: File })?.file;
      body.append("investorMemoFile", investorMemoFile);
    } else if (key === "valuationReportFile") {
      const valuationReportFile = (value as { file: File })?.file;
      body.append("valuationReportFile", valuationReportFile);
    } else if (key === "rentalContractsFile") {
      const rentalContractsFile = (value as { file: File })?.file;
      body.append("rentalContractsFile", rentalContractsFile);
    } else if (key === "projectionReportFile") {
      const projectionReportFile = (value as { file: File })?.file;
      body.append("projectionReportFile", projectionReportFile);
    } else if (key === "otherDocuments") {
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
