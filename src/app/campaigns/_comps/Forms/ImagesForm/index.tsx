"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import ImageCard from "@/components/ImageCard";
import { useUpdatePhotosMutation } from "@/store/services/campaigns/assetDetailsApi";
import Spinner from "@/components/Spinner";
import { IImageSubmitForm, IImagesFormProps } from "./type";
import { nanoid } from "nanoid";

import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const ImagesForm = ({ assetId, assetMediaFiles }: IImagesFormProps) => {
  const [postEditDeleteAssetPhotos, { isLoading }] = useUpdatePhotosMutation(); // RTK query for edit/delete campaign images

  // useForm to hold the states
  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IImageSubmitForm>({
    defaultValues: {
      assetId: assetId,
      campaignImages: Array.from(
        { length: 20 },
        (_, index) => assetMediaFiles[index] || {},
      ),
      thumbnailFileName: "",
      imagesArray: [],
      fileIDs: [],
      DfileIDs: [],
      thumbnail: {},
    },
  });
  // to access useForm state data
  const useFormAccessor = watch();

  useEffect(() => {
    reset({
      assetId: assetId,
      campaignImages: [...assetMediaFiles],
      thumbnailFileName: "",
      imagesArray: [],
      fileIDs: [],
      DfileIDs: [],
      thumbnail: {},
    });
  }, [assetId, assetMediaFiles, reset]);

  const imageUploadHandler = (uploadedImage: File | null, fileId: string) => {
    // Check if the fileId already exists in the arrays
    const index = useFormAccessor.imagesArray.findIndex(
      (image) => image.fileId === fileId && image.fileId != "",
    );

    // if the onClicked image is the Thumbnail, set thumbnailFileName to keep the check
    const matched = useFormAccessor.campaignImages.find(
      (cmp) => cmp.fileId == fileId,
    );
    if (matched?.isThumbnail && uploadedImage)
      setValue("thumbnailFileName", uploadedImage.name);

    if (index !== -1) {
      // If fileId exists, update the image in imagesArray
      const updatedImagesArray = [...useFormAccessor.imagesArray];
      updatedImagesArray[index] = { fileId, uploadedImage };
      setValue("imagesArray", updatedImagesArray, { shouldDirty: true });

      // Update fileId in fileIDs array
      const updatedFileIDs = [...useFormAccessor.fileIDs];
      updatedFileIDs[index] = { fileId, action: "EDIT" };
      setValue("fileIDs", updatedFileIDs, { shouldDirty: true });
    } else {
      // If fileId doesn't exist, add the new image and fileId to arrays
      setValue(
        "imagesArray",
        [...useFormAccessor.imagesArray, { fileId, uploadedImage }],
        { shouldDirty: true },
      );
      if (!fileId) return;
      setValue(
        "fileIDs",
        [...useFormAccessor.fileIDs, { fileId, action: "EDIT" }],
        { shouldDirty: true },
      );
    }
  };

  const imageDeleteHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    fileId: string,
  ) => {
    event.preventDefault();
    const deletedFileIDs = [...useFormAccessor.DfileIDs];

    // remove the campaign and add it to the deleted list
    const campaignImages = useFormAccessor.campaignImages.filter(
      (Obj) => Obj.fileId !== fileId,
    );
    deletedFileIDs.push({ fileId, action: "DELETE" });

    setValue("campaignImages", campaignImages);
    setValue("DfileIDs", deletedFileIDs, { shouldDirty: true });
  };

  const thumbnailCheckHandler = (fileId: string) => {
    // get => campaigns & the onClicked fileId
    const updatedCampaigns = [...useFormAccessor.campaignImages];
    const indexMatched = updatedCampaigns.findIndex(
      (cmp) => cmp.fileId == fileId,
    );

    // update => the campaignImages state [isThumbnail]
    updatedCampaigns.forEach((cmp) => (cmp.isThumbnail = false));
    updatedCampaigns[indexMatched].isThumbnail = true;

    // set => state
    setValue("campaignImages", updatedCampaigns);
    setValue(
      "thumbnail",
      { fileId, action: "THUMBNAIL" },
      { shouldDirty: true },
    );
  };

  // onSubmit Handler
  const onSubmit: SubmitHandler<IImageSubmitForm> = async (formData) => {
    const imagesAction = [
      ...formData.fileIDs,
      ...useFormAccessor.DfileIDs,
      useFormAccessor.thumbnail,
    ];
    const uploadedImages = formData.imagesArray.map(
      (imageObj) => imageObj.uploadedImage,
    );

    const data = new FormData();
    data.append("assetId", useFormAccessor.assetId);
    data.append("imagesAction", JSON.stringify(imagesAction));
    uploadedImages.forEach((img) => {
      data.append(`assetPhotos`, img as File);
    });
    // if the thumbnailFileName has a value append it with the requist
    if (useFormAccessor.thumbnailFileName)
      data.append("thumbnailFileName", useFormAccessor.thumbnailFileName);

    reset();
    await postEditDeleteAssetPhotos({ body: data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Images"
        // status="PENDING"
        status={
          assetMediaFiles.length > 2
            ? "COMPLETE"
            : assetMediaFiles.length === 0
            ? "INCOMPLETE"
            : "PENDING"
        }
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!isLoading ? (
              <>
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
              </>
            ) : (
              <Spinner />
            )}
          </div>
        }
      >
        {isLoading ? (
          <GridFormSkeleton />
        ) : (
          <div className="flex gap-[15px] flex-wrap">
            {[...Array(20)].map((_, index) => {
              const image = useFormAccessor.campaignImages[index];
              return (
                <ImageCard
                  key={nanoid()}
                  fileId={image ? image.fileId : ""}
                  imgUrl={image ? image.filePath : ""}
                  imagesArray={useFormAccessor.imagesArray}
                  thumbnail={image ? image.isThumbnail : false}
                  disabled={isLoading}
                  onDelete={(event) =>
                    imageDeleteHandler(event, image ? image.fileId : "")
                  }
                  onChange={(file) =>
                    imageUploadHandler(file, image ? image.fileId : "")
                  }
                  onthumbnail={() =>
                    thumbnailCheckHandler(image ? image.fileId : "")
                  }
                />
              );
            })}
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default ImagesForm;
