"use client";

import { ChangeEvent, useEffect, useState, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import Accordion from "@/components/Accordion";
import DownloadWrapper from "@/components/DownloadWrapper";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import { Plus } from "@/utils/icons";
import { useUpdateAssetDocumentMutation } from "@/store/services/campaigns/assetDetailsApi";

import { IDocumentSubmitForm, IDocumentsFormProps, TFileKey } from "./type";
import CreateDocumentModal from "./CreateDocumentModal";
import { defaultValue, handleFormData } from "./utils";
import { LABEL, requiredKeys } from "./configs";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const DocumentsForm = ({
  propertyDocuments,
  campaignId,
  assetId,
}: IDocumentsFormProps) => {
  const [addDocuments, setAddDocuments] = useState(false);

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm<IDocumentSubmitForm>({
    defaultValues: useMemo(
      () => defaultValue(propertyDocuments),
      [propertyDocuments],
    ),
  });

  const useFormAccessor = watch();

  const [updateDocuments, { isLoading }] = useUpdateAssetDocumentMutation();

  useEffect(() => {
    reset(defaultValue(propertyDocuments));
  }, [propertyDocuments, reset]);

  const onChnageHandler = (
    ev: ChangeEvent<HTMLInputElement>,
    fileKey: TFileKey,
  ) => {
    setValue(
      fileKey,
      {
        fileId: useFormAccessor[fileKey].fileId,
        fileName: ev.target.files?.[0]?.name ?? "",
        filePath: "",
        fileKey,
        file: ev.target.files?.[0] as File,
      },
      { shouldDirty: true },
    );

    const index = useFormAccessor.documentsAction.findIndex(
      (image) => image.fileId === useFormAccessor[fileKey].fileId,
    );

    if (index !== -1) {
      const updatedFileIDs = [...useFormAccessor.documentsAction];
      updatedFileIDs[index] = {
        fileId: useFormAccessor[fileKey].fileId,
        action: "EDIT",
      };
      setValue("documentsAction", updatedFileIDs, {
        shouldDirty: true,
      });
    } else {
      if (!useFormAccessor[fileKey].fileId) return;

      setValue(
        "documentsAction",
        [
          ...useFormAccessor.documentsAction,
          {
            fileId: useFormAccessor[fileKey].fileId,
            action: "EDIT",
          },
        ],
        { shouldDirty: true },
      );
    }
  };

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

  const handleSubmitComapny: SubmitHandler<IDocumentSubmitForm> = async (
    formData,
  ) => {
    await updateDocuments({
      campaignId,
      body: handleFormData(assetId, formData, dirtyFields),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
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
        title="Documents"
        status={
          propertyDocuments.length > 3
            ? "COMPLETE"
            : propertyDocuments.length === 0
            ? "INCOMPLETE"
            : "PENDING"
        }
        EditButton={
          !isLoading ? (
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
        {isLoading ? (
          <GridFormSkeleton />
        ) : (
          <>
            {/* Documents */}
            <div className="grid md:grid-cols-1 gap-4">
              {requiredKeys.map((key) => {
                const { fileKey } = (propertyDocuments[
                  key as keyof typeof propertyDocuments
                ] || { fileKey: key }) as { fileKey: string };

                return (
                  <DownloadWrapper
                    key={key}
                    placholder={LABEL[fileKey as TFileKey]?.placeHolder}
                    edit={
                      useFormAccessor[fileKey as TFileKey]?.fileName ?? false
                    }
                    filePath={useFormAccessor[fileKey as TFileKey]?.filePath}
                    value={useFormAccessor[fileKey as TFileKey]?.fileName}
                    secondaryLabel={[LABEL[fileKey as TFileKey]?.title]}
                    onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                      onChnageHandler(ev, fileKey as TFileKey)
                    }
                    disabled={isLoading}
                    accept="application/pdf"
                  />
                );
              })}
            </div>

            <hr className="bg-secondary my-8" />

            {/* Other Documents */}
            <div className="grid md:grid-cols-1 gap-4">
              {useFormAccessor?.otherDocuments?.map((item) => (
                <DownloadWrapper
                  key={nanoid()}
                  onDelete={() => deleteHandler(item.fileName, item.fileId)}
                  edit
                  value={item.fileName ?? "-"}
                  secondaryLabel={item.fileKey ?? "-"}
                  disabled={isLoading}
                  accept="application/pdf"
                />
              ))}
            </div>

            {/* Add Document Button */}
            <CustomButton
              type="button"
              disabled={isLoading}
              onClick={() => setAddDocuments(true)}
              className="bg-primary text-white text-[14px] px-3 py-1 font-[300] animate-fade tracking-wider rounded-sm flex items-center justify-center mt-4"
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
