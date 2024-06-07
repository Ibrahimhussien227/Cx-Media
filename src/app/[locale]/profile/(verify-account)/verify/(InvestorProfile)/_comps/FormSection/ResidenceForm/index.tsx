import GeneralTextarea from "@/components/GeneralTextarea";
import DownloadWrapper from "@/components/DownloadWrapper";

import { DESCRIPTIONFIELD, VALIDRESDKEYS } from "./configs";
import { IResidenceFormProps, fieldNames, IFileUploadHandler } from "./type";
import { findFileByFileId, investorFilterDropdown } from "../utils";
import FormField from "../FormSelectField";
import { useState } from "react";
import { maxFileSize } from "../configs";

const ResidenceForm = ({
  hookForm,
  isLoading,
  applicationCompleted,
  investorDropdown,
}: IResidenceFormProps) => {
  const [error, setError] = useState("");
  const formAccessor = hookForm.watch();

  const { residenceType, addressProofType, files } = formAccessor;

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
          hookForm.setValue("files", newFiles, {
            shouldDirty: true,
          });
        }
      } else {
        setError("File size exceeds the limit of 5MB");
      }
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
    <>
      {/* row */}
      {error && (
        <p className="text-center text-sm text-red-500 mb-4">{error}</p>
      )}
      <FormField
        isLoading={isLoading || applicationCompleted}
        label="RESIDENTIAL STATUS"
        selectValue={
          investorFilterDropdown(
            investorDropdown,
            "investorResidenceType"
          ).find((level) => level.value === residenceType) || ""
        }
        options={
          investorFilterDropdown(investorDropdown, "investorResidenceType") ||
          []
        }
        onChange={(selectedOption) =>
          handleSelectChange("residenceType", selectedOption)
        }
        description="Select an option from the list that best identifies with your current
        living situation."
      />
      {residenceType && (
        <>
          {/* row */}
          <div className="w-full flex flex-row mt-5 gap-5">
            <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
              ADDRESS
            </div>
            <div className="w-[25%]">
              <GeneralTextarea
                readOnly={isLoading || applicationCompleted}
                placeholder="Address"
                {...hookForm.register("addressLine1")}
              />
            </div>
            <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
              Enter the full property address as it appears on your valid
              address proof document.
            </p>
          </div>
          {/* row */}
          <FormField
            isLoading={isLoading || applicationCompleted}
            label="ADDRESS PROOF TYPE"
            selectValue={
              investorFilterDropdown(
                investorDropdown,
                "investorAddressProofType"
              ).find((level) => level.value === addressProofType) || ""
            }
            options={
              investorFilterDropdown(
                investorDropdown,
                "investorAddressProofType"
              ) || []
            }
            onChange={(selectedOption) =>
              handleSelectChange("addressProofType", selectedOption)
            }
            description="Select the type of address proof document you wish to upload from
        the list."
          />
          {/* row */}
          <div className="w-full flex flex-row items-center mt-5 gap-5">
            <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
              ADDRESS PROOF
            </div>
            <div className="w-[25%]">
              <DownloadWrapper
                disabled={applicationCompleted}
                edit={findFileByFileId(files, "addressProofDocument")?.filePath}
                value={
                  findFileByFileId(files, "addressProofDocument")?.file?.name ||
                  findFileByFileId(files, "addressProofDocument")?.fileName
                }
                filePath={
                  findFileByFileId(files, "addressProofDocument")?.filePath
                }
                placeholder="Select File"
                className="w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  fileUploadHandler(e, "addressProofDocument")
                }
              />
            </div>
            <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
              Upload the address proof document in pdf, jpeg or png format. Max
              size 5MB.
            </p>
          </div>
          {/* row */}
          {!VALIDRESDKEYS?.includes(residenceType) && (
            <>
              <FormField
                register={{
                  ...hookForm.register("friendRelativeName"),
                }}
                isLoading={isLoading || applicationCompleted}
                label={
                  DESCRIPTIONFIELD[
                    residenceType as keyof typeof DESCRIPTIONFIELD
                  ]?.fieldTitle
                }
                placeholder="Place your relative Name"
                description="Upload Passport or National Identity in pdf, jpeg or png format. Max size 5MB."
              />
              {/* row */}
              <div className="w-full flex flex-row items-center mt-5 gap-5">
                <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
                  {
                    DESCRIPTIONFIELD[
                      residenceType as keyof typeof DESCRIPTIONFIELD
                    ]?.uploadTitle
                  }
                </div>
                <div className="w-[25%]">
                  <DownloadWrapper
                    disabled={applicationCompleted}
                    edit={
                      findFileByFileId(files, "friendRelativeProofDocument")
                        ?.filePath
                    }
                    value={
                      findFileByFileId(files, "friendRelativeProofDocument")
                        ?.file?.name ||
                      findFileByFileId(files, "friendRelativeProofDocument")
                        ?.fileName
                    }
                    filePath={
                      findFileByFileId(files, "friendRelativeProofDocument")
                        ?.filePath
                    }
                    placeholder="Upload identify proof"
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      fileUploadHandler(e, "friendRelativeProofDocument")
                    }
                  />
                </div>
                <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
                  Upload Passport or National Identity in pdf, jpeg or png
                  format. Max size 5MB.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ResidenceForm;
