"use client";

import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import DownloadWrapper from "@/components/DownloadWrapper";
import GeneralInput from "@/components/GeneralInput";
import { INVESTOR_APPLICATION_STATUS } from "@/types/enum.constants";
import { AddDocSectionProps, IDocumentSubmitForm } from "./type";
import { SubmitDocument } from "./actions";
import { defaultValue, filterDocuments } from "./utils";

const AddDocSection = ({
  actionRequiredStatus,
  investorDetails,
  activeDocuments,
}: AddDocSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setValue, watch, register, handleSubmit } =
    useForm<IDocumentSubmitForm>({
      defaultValues: useMemo(
        () =>
          investorDetails?.otherDocuments
            ? defaultValue(investorDetails?.otherDocuments)
            : { otherDocuments: [], otherDocumentsParam: [] },
        [investorDetails]
      ),
    });
  const formAccessor = watch();

  const hideButton = [
    INVESTOR_APPLICATION_STATUS.UNDER_REVIEW,
    INVESTOR_APPLICATION_STATUS.VERIFIED,
  ].includes(investorDetails?.applicationStatus as INVESTOR_APPLICATION_STATUS);

  const actionRequired = useMemo(() => {
    return (
      INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED.includes(
        investorDetails?.applicationStatus
      ) &&
      (formAccessor.otherDocumentsParam.length === 0 ||
        formAccessor.otherDocuments.length === 0 ||
        formAccessor.otherDocumentsParam.length !==
          formAccessor.otherDocuments.length ||
        investorDetails.otherDocuments.length >=
          (formAccessor.otherDocuments.length ||
            formAccessor.otherDocumentsParam.length))
    );
  }, [investorDetails, formAccessor]);

  const addDocumentHandler = useCallback(() => {
    setValue("otherDocumentsParam", [
      ...formAccessor.otherDocumentsParam,
      {
        documentName: "",
        originalFileName: "",
      },
    ]);
  }, [formAccessor.otherDocumentsParam, setValue]);

  const onAdding = () => {
    const lastElement = formAccessor.otherDocumentsParam.length - 1;

    if (
      lastElement === undefined ||
      (formAccessor.otherDocumentsParam[lastElement]?.documentName !== "" &&
        formAccessor.otherDocumentsParam[lastElement]?.originalFileName !== "")
    ) {
      addDocumentHandler();
    }
  };

  const fileUploadHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    doc: string
  ) => {
    e.preventDefault();

    if (e.target.files) {
      const updatedDocuments = [...formAccessor.otherDocuments];
      updatedDocuments[+doc] = {
        ...updatedDocuments[+doc],
        file: e.target.files[0],
      };
      setValue("otherDocuments", updatedDocuments);

      const updatedDocumentsParams = [...formAccessor.otherDocumentsParam];
      updatedDocumentsParams[+doc].originalFileName = e.target.files[0].name;
      setValue("otherDocumentsParam", updatedDocumentsParams);
    }
  };

  const handleSubmitDocuments: SubmitHandler<IDocumentSubmitForm> = async (
    formData
  ) => {
    setIsLoading(true);

    if (!isLoading) {
      if (activeDocuments) {
        SubmitDocument(
          filterDocuments(
            formData,
            defaultValue(investorDetails.otherDocuments)
          )
        ).finally(() => setIsLoading(false));
      } else {
        SubmitDocument().finally(() => setIsLoading(false));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitDocuments)}
      className="w-[30%] h-full flex-1"
    >
      {!hideButton && (
        <>
          <CustomButton
            disabled={
              INVESTOR_APPLICATION_STATUS.VERIFIED.includes(
                investorDetails?.applicationStatus
              ) ||
              isLoading ||
              actionRequired
            }
            type="submit"
            className={`absolute top-[15px] right-[28px] bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]  ${
              isLoading ||
              actionRequired ||
              INVESTOR_APPLICATION_STATUS.VERIFIED.includes(
                investorDetails?.applicationStatus
              )
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            SUBMIT
          </CustomButton>
          <CustomButton
            disabled={
              INVESTOR_APPLICATION_STATUS.VERIFIED.includes(
                investorDetails?.applicationStatus
              ) ||
              isLoading ||
              actionRequired
            }
            type="submit"
            className={`absolute -top-[68px] right-[28px] bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] ${
              isLoading ||
              actionRequired ||
              INVESTOR_APPLICATION_STATUS.VERIFIED.includes(
                investorDetails?.applicationStatus
              )
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            SUBMIT
          </CustomButton>
        </>
      )}

      {(activeDocuments || actionRequiredStatus) &&
        formAccessor?.otherDocumentsParam?.map((doc, index) => (
          <div key={index} className="border-b pb-1 mb-3 SINGLE-DOC">
            <div className="w-full">
              <GeneralInput
                readOnly={
                  typeof formAccessor.otherDocuments[index]?.file === "string"
                }
                type="text"
                placeholder="Enter a name for the document"
                {...register(`otherDocumentsParam.${index}.documentName`)}
              />
            </div>
            <div className="w-full py-2">
              <DownloadWrapper
                edit={
                  typeof formAccessor.otherDocuments[index]?.file ===
                    "string" && formAccessor.otherDocuments[index]?.file
                }
                disabled={
                  typeof formAccessor.otherDocuments[index]?.file ===
                    "string" && formAccessor.otherDocuments[index]?.file
                }
                value={doc.originalFileName}
                placeholder="Upload Document"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  fileUploadHandler(e, index.toString())
                }
                filePath={
                  typeof formAccessor.otherDocuments[index]?.file ===
                    "string" && formAccessor.otherDocuments[index]?.file
                }
              />
            </div>
          </div>
        ))}
      {(!hideButton ||
        INVESTOR_APPLICATION_STATUS.PENDING.includes(
          investorDetails?.applicationStatus as INVESTOR_APPLICATION_STATUS
        )) && (
        <span
          className="bg-[#5A6A93] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] w-fit cursor-pointer"
          onClick={onAdding}
        >
          ADD DOCUMENT +
        </span>
      )}
    </form>
  );
};

export default AddDocSection;
