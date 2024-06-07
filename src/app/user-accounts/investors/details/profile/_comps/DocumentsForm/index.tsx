"use client";

import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import Accordion from "@/components/Accordion";
import DownloadWrapper from "@/components/DownloadWrapper";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import { Plus } from "@/utils/icons";

import { IDocumentSubmitForm, IDocumentsProps } from "./type";
import CreateDocumentModal from "./CreateDocumentModal";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { useUpdateInvestorMutation } from "@/store/services/investors/investorDetailsApi";
import { defaultValue, handleFormData } from "./utils";

const DocumentsForm = ({ data, investorId }: IDocumentsProps) => {
  const [updateInvestor] = useUpdateInvestorMutation();
  const [addDocuments, setAddDocuments] = useState(false);

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm<IDocumentSubmitForm>({
    defaultValues: useMemo(
      () => defaultValue(data?.otherDocuments),
      [data?.otherDocuments],
    ),
  });

  const useFormAccessor = watch();

  // rplace this variable wiht (isLoading) status of RTK mutation
  const updateDocsApiIsloding = false;

  const deleteHandler = (fileName: string, fileId: string) => {
    const deleteItem = useFormAccessor.otherDocuments.filter(
      (item) => item.fileName !== fileName,
    );
    setValue("otherDocuments", deleteItem);
    const deleteParams = useFormAccessor.otherDocumentsParam.filter(
      ({ documentName }) => documentName !== fileName,
    );
    setValue("otherDocumentsParam", deleteParams);

    if (fileId) {
      setValue(
        "documentsAction",
        [
          ...useFormAccessor.documentsAction,
          {
            fileId: fileId,
            action: "DELETE",
          },
        ],
        { shouldDirty: true },
      );
    }
  };

  const onSubmit: SubmitHandler<IDocumentSubmitForm> = async (formData) => {
    await updateInvestor({
      body: handleFormData("", investorId, formData, dirtyFields),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      {/* Modal */}
      {addDocuments && (
        <CreateDocumentModal
          setValue={setValue}
          useFormAccessor={useFormAccessor}
          setShowModal={setAddDocuments}
        />
      )}

      <Accordion
        title="Other Documents"
        EditButton={
          !updateDocsApiIsloding ? (
            <div
              className={`${
                !isDirty && "opacity-50"
              } flex flex-row w-full justify-between items-center gap-3`}
            >
              <CustomButton
                className={`p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border ${
                  isDirty && "hover:bg-[#F5F8FF]"
                }`}
                onClick={() => reset()}
                disabled={!isDirty}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                className="bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade"
                disabled={!isDirty}
              >
                Update
              </CustomButton>
            </div>
          ) : (
            <Spinner />
          )
        }
      >
        {updateDocsApiIsloding ? (
          <GridFormSkeleton />
        ) : (
          <>
            {/* Other Documents */}
            <div className="grid md:grid-cols-1 gap-4">
              {useFormAccessor?.otherDocuments?.map((item) => (
                <DownloadWrapper
                  key={nanoid()}
                  onDelete={() => deleteHandler(item.fileName, item.fileId)}
                  edit
                  value={item.fileName ?? "-"}
                  secondaryLabel={item.fileKey ?? "-"}
                  disabled={updateDocsApiIsloding}
                  accept="application/pdf"
                />
              ))}
            </div>

            {/* Add Document Button */}
            <CustomButton
              type="button"
              disabled={updateDocsApiIsloding}
              onClick={() => setAddDocuments(true)}
              className="bg-primary text-white text-[14px] px-3 py-2 font-[300] animate-fade tracking-wider rounded-sm flex items-center justify-center mt-4"
            >
              <Plus />
              ADD DOCUMENT
            </CustomButton>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default DocumentsForm;
