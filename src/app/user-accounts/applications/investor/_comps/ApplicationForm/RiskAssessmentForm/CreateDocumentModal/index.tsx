import React, { useState } from "react";

import CustomButton from "@/components/CustomButton";
import FormModal from "@/components/FormModal";
import TextInput from "@/components/TextInput";
import UploadButton from "@/components/UploadButton";
import { ICreateDocumentModal, IDocument } from "./type";

const CreateDocumentModal = ({
  setShowModal,
  setValue,
  useFormAccessor,
}: ICreateDocumentModal) => {
  const [document, setDocument] = useState<IDocument>({
    fileKey: "",
    file: null,
  });
  const handleSubmitAddDocument = () => {
    if (document.file && document.fileKey) {
      setValue(
        "otherDocuments",
        [
          ...useFormAccessor.otherDocuments,
          {
            fileId: "",
            fileName: document.file?.name ?? "",
            filePath: "",
            fileKey: document.fileKey,
            file: document.file,
          },
        ],
        { shouldDirty: true }
      );
      setValue(
        "otherDocumentsParam",
        [
          ...useFormAccessor.otherDocumentsParam,
          {
            documentName: document.fileKey,
            originalFileName: document.file?.name ?? "",
          },
        ],
        { shouldDirty: true }
      );
      setShowModal(false);
      setDocument({ file: null, fileKey: "" });
    }
  };
  return (
    <FormModal setShowModal={setShowModal} title="Upload Document">
      <div className="flex flex-col gap-4 w-full px-2">
        <div className="flex flex-col w-full">
          <label className="w-full capitalize text-[12px] font-bold pl-2.5">
            Document Name
          </label>
          <TextInput
            placeholder="Dcoument Name"
            value={document.fileKey}
            onChange={(evt) =>
              setDocument({ ...document, fileKey: evt.target.value })
            }
          />
        </div>
        <div>
          <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
            Upload Document
          </label>
          <div className="flex flex-col w-full">
            <div className="flex w-full items-center">
              <div className="flex flex-row items-center w-full justify-between bg-[#F5F8FF80] p-1 border-dotted border-[2px] py-2">
                {document.file ? (
                  <p className="text-[12px] font-medium pl-1">
                    {document?.file.name}
                  </p>
                ) : (
                  <p className="text-[12px] font-medium pl-1 opacity-50">
                    jpeg, pdf, or png. Max 500 KB
                  </p>
                )}

                <div className="flex flex-row mr-2 gap-2">
                  <UploadButton
                    icon={{ props: { size: 14 }, name: "UploadSimple" }}
                    value={document.fileKey}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                      setDocument({
                        ...document,
                        file: ev.target.files?.[0] as File,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end items-center gap-3">
          <CustomButton
            onClick={() => {
              setShowModal(false), setDocument({ file: null, fileKey: "" });
            }}
            className="font-[500] text-[14px] text-primary px-5 py-1 rounded-none animate-fade border tracking-wider hover:bg-[#F5F8FF font-semibold]"
          >
            CANCEL
          </CustomButton>
          <CustomButton
            type="button"
            className="bg-primary text-[white] text-[14px] px-5 py-1 font-semibold rounded-none animate-fade tracking-[1.5px]"
            onClick={() => {
              handleSubmitAddDocument();
            }}
          >
            SUBMIT
          </CustomButton>
        </div>
      </div>
    </FormModal>
  );
};

export default CreateDocumentModal;
