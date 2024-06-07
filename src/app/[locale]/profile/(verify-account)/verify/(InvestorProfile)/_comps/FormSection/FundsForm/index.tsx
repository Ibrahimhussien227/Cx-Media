import DownloadWrapper from "@/components/DownloadWrapper";
import { DESCRIPTIONFIELD, VALIDFUNDSKEYS } from "./configs";
import { IFundsFormProps, IFileUploadHandler, fieldNames } from "./type";
import { findFileByFileId, investorFilterDropdown } from "../utils";
import FormField from "../FormSelectField";
import { useState } from "react";
import { maxFileSize } from "../configs";

const FundsForm = ({
  hookForm,
  isLoading,
  applicationCompleted,
  investorDropdown,
}: IFundsFormProps) => {
  const [error, setError] = useState("");
  const formAccessor = hookForm.watch();

  const { sourceOfFunds, files } = formAccessor;

  const fileUploadHandler: IFileUploadHandler = (e, type) => {
    e.preventDefault();

    if (e.target.files) {
      const file = e.target.files[0];
      // Assuming hookForm is your form handler
      const currentFiles = files;
      const fileIndex = currentFiles.findIndex(
        (fileObj: { fileId: string }) => fileObj.fileId === type
      );
      if (file.size < maxFileSize) {
        setError("");
        if (fileIndex !== -1) {
          // If file with fileId exists, update it
          const updatedFiles = [...currentFiles];
          updatedFiles[fileIndex] = {
            fileId: type,
            file: file,
          };
          hookForm.setValue("files", updatedFiles, {
            shouldDirty: true,
          });
        } else {
          // If file with fileId doesn't exist, create new entry
          const newFiles = [
            ...currentFiles,
            {
              fileId: type,
              file: file,
            },
          ];
          hookForm.setValue("files", newFiles, { shouldDirty: true });
        }
      }
    } else {
      setError("File size exceeds the limit of 5MB");
    }
  };

  const handleSelectChange = (
    fieldName: fieldNames,
    selectedOption: IOption
  ) => {
    hookForm.setValue(fieldName, selectedOption.value, {
      shouldDirty: true,
    });
  };

  return (
    <div className="h-full overflow-auto pb-[300px]">
      {" "}
      {error && (
        <p className="text-center text-sm text-red-500 mb-4">{error}</p>
      )}
      <FormField
        isLoading={isLoading || applicationCompleted}
        label="SOURCE OF FUNDS"
        selectValue={
          investorFilterDropdown(
            investorDropdown,
            "investorSourceOfFunds"
          ).find((level) => level.value === sourceOfFunds) || ""
        }
        options={
          investorFilterDropdown(investorDropdown, "investorSourceOfFunds") ||
          []
        }
        onChange={(selectedOption) =>
          handleSelectChange("sourceOfFunds", selectedOption)
        }
        description="Select an option from the list that best describes your source of
        funds."
      />
      {sourceOfFunds && (
        <div className="w-full flex flex-row items- mt-5 gap-5">
          <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
            {
              DESCRIPTIONFIELD[sourceOfFunds as keyof typeof DESCRIPTIONFIELD]
                ?.titleFile
            }
          </div>
          <div className="w-[25%]">
            <DownloadWrapper
              // readOnly={isLoading}
              disabled={applicationCompleted}
              edit={findFileByFileId(files, "sourceOfFundsProof")?.filePath}
              value={
                findFileByFileId(files, "sourceOfFundsProof")?.file?.name ||
                findFileByFileId(files, "sourceOfFundsProof")?.fileName
              }
              filePath={findFileByFileId(files, "sourceOfFundsProof")?.filePath}
              placeholder={
                DESCRIPTIONFIELD[sourceOfFunds as keyof typeof DESCRIPTIONFIELD]
                  ?.filePlaceHolder
              }
              className="w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                fileUploadHandler(e, "sourceOfFundsProof")
              }
            />
          </div>
          <div className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
            {DESCRIPTIONFIELD[
              sourceOfFunds as keyof typeof DESCRIPTIONFIELD
            ]?.headerPlaceholder
              .split(new RegExp(`(any one)`, "gi"))
              .map((part, index) =>
                part.toLowerCase() === `any one`.toLowerCase() ? (
                  <span key={index} className="text-[#FF5A5A]">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}

            {DESCRIPTIONFIELD[sourceOfFunds as keyof typeof DESCRIPTIONFIELD]
              ?.desc && (
              <p className="mt-10 tracking-[0px]">
                {
                  DESCRIPTIONFIELD[
                    sourceOfFunds as keyof typeof DESCRIPTIONFIELD
                  ]?.desc
                }
              </p>
            )}

            {DESCRIPTIONFIELD[
              sourceOfFunds as keyof typeof DESCRIPTIONFIELD
            ]?.headerArray?.map(({ header, description }) => (
              <div
                key={header + description}
                className="flex justify-start items-start flex-row gap-2 mt-10"
              >
                <span className="px-[2px] py-[2px] flex rounded-full bg-active mt-2" />
                <div className="flex flex-col items-start justify-center">
                  <p className=" font-bold">{header}</p>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {VALIDFUNDSKEYS?.includes(sourceOfFunds) && (
        <div className="w-full flex flex-row items- mt-5 gap-5">
          <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
            {sourceOfFunds.includes("Student")
              ? "BANK STATEMENTS"
              : "TRANSACTION PROOF"}
          </div>
          <div className="w-[25%]">
            <DownloadWrapper
              // readOnly={isLoading}
              disabled={applicationCompleted}
              edit={
                findFileByFileId(files, "sourceOfFundsTransactionProof")
                  ?.filePath
              }
              value={
                findFileByFileId(files, "sourceOfFundsTransactionProof")?.file
                  ?.name ||
                findFileByFileId(files, "sourceOfFundsTransactionProof")
                  ?.fileName
              }
              filePath={
                findFileByFileId(files, "sourceOfFundsTransactionProof")
                  ?.filePath
              }
              placeholder={
                sourceOfFunds.includes("Student")
                  ? "Upload bank statements"
                  : "Upload transaction proof"
              }
              className="w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                fileUploadHandler(e, "sourceOfFundsTransactionProof")
              }
            />
          </div>
          <div className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
            {sourceOfFunds.includes("Student")
              ? "Submit your parent’s official bank statement showing transactions for the last 3 months."
              : "Submit an official bank statement or other relevant financial statement showing the proof of the winnings transaction."}
          </div>
        </div>
      )}
    </div>
  );
};

export default FundsForm;
