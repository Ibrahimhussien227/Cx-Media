"use client";
import { nanoid } from "nanoid";
import GeneralCheckbox from "@/components/generalCheckbox";
import ImageUploader from "@/components/imageUploader";
import { useTranslation } from "react-i18next";
import { ITrackedForm } from "../../_sections/property-detail/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { completionStatus, fileKeysEnum } from "@/types/enum.constants";
import { useAddAssetPhotosMutation } from "@/store/services/campaign/assetMediaApi";
import { preparePhotosParams } from "./utils";
import { convertObjToFormData } from "@/utils/convertObjToFormData";
import  { PencilSimple, Plus, Trash }  from "../../../../../utils/icons";
import Button from "@/components/button";
import useOnUnmount from "@/hooks/useOnUnmount";

const PropertyImagesForm = ({formId, updateTracker, campaignDetails, configActionBtn}:ITrackedForm) => {
  const { t } = useTranslation("campaignsPage");

  const assetPhotosInitialState = useMemo(
    ()=> campaignDetails.assetDetails?.assetMediaFiles?.filter(file=> file.fileKey === fileKeysEnum.assetPhotos) || [],
    [campaignDetails.assetDetails?.assetMediaFiles]
  )

  const [addAssetPhotos, {isSuccess}] = useAddAssetPhotosMutation();

  const [formImages, setFormImages] = useState<(File | IAssetMediaFiles | null)[]>(assetPhotosInitialState);
  const [thumbnailIdx, setThumbnailIdx] = useState<number>(
    assetPhotosInitialState.findIndex((mediaFile: IAssetMediaFiles)=> mediaFile.isThumbnail)
  );

  const [placeholders, setPlaceholders] = useState([0,1,2,3,4,5,6,7,8,9,10]);

  useEffect(()=> {
    if (!configActionBtn) return;
    
    const {hasChangeOcurred, photosParams} = preparePhotosParams(assetPhotosInitialState, formImages, thumbnailIdx)
    if (hasChangeOcurred){
      configActionBtn({
        disabled: false,
        onClick: ()=> addAssetPhotos({
          campaignId: campaignDetails.campaignId,
          params: convertObjToFormData({
            assetId: campaignDetails.assetId as string,
            ...photosParams,
          })
        })
      })
    } else {
      configActionBtn({disabled: true})
    }
  
  }, [addAssetPhotos, assetPhotosInitialState, campaignDetails.assetId, campaignDetails.campaignId, configActionBtn, formImages, thumbnailIdx])

  useEffect(()=> {
    if (!updateTracker) return;
    if (formImages.filter(Boolean).length > 10){
      updateTracker(formId, completionStatus.COMPLETE)
    } else {
      updateTracker(formId, completionStatus.PENDING)
    }
  }, [formImages, formId, updateTracker])


  const autoSaveOnLeave = useCallback(()=> {
    const {hasChangeOcurred, photosParams} = preparePhotosParams(assetPhotosInitialState, formImages, thumbnailIdx)
    if (hasChangeOcurred){
      addAssetPhotos({
        campaignId: campaignDetails.campaignId,
        params: convertObjToFormData({
          assetId: campaignDetails.assetId as string,
          ...photosParams,
        })
      })
    }
  }, [addAssetPhotos, assetPhotosInitialState, campaignDetails.assetId, campaignDetails.campaignId, formImages, thumbnailIdx])
  
  useOnUnmount(autoSaveOnLeave)

  useEffect(()=> {
    if (assetPhotosInitialState){
      setFormImages(assetPhotosInitialState)
    }
  }, [assetPhotosInitialState])

  const handleFileChange =(idx: number, file: File | null)=> {
    let idxNewVal: File | null | IAssetMediaFiles;
    if (
      file === null && // user is removing
      assetPhotosInitialState[idx] !== formImages[idx] // his own upload (not a previously saved file)
    ){
      idxNewVal = assetPhotosInitialState[idx]; //reset to initial value
    } else {
      idxNewVal = file // apply new value, even if null
    }
    const newFormImages = formImages.concat([]);
    newFormImages[idx] = idxNewVal
    setFormImages(newFormImages)
  }

  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      <div className="flex w-full items-center">
        <div className="flex w-[100%]">
          <label className="flex w-[25%] font-semibold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0 mr-[12px]">
            {t("propertyImagesForm.propertyGallery")}
          </label>
          <div className="flex w-[75%] flex-col">
            <p className="text-[#93A0C3] text-[12px] tracking-[0px] px-[10px] mb-[10px]">
              {t("propertyImagesForm.propertyGalleryContent")}
              <span className="font-semibold ml-1 text-[#BFC5D5]">
                {t("propertyImagesForm.propertyGallerySubContent")}
              </span>
            </p>
            <p className="text-[#93A0C3] text-[12px] tracking-[0px] px-[10px] mb-[10px]">
              <span className="font-semibold mr-1 text-[#93A0C3]">Note:</span>
              {t("propertyImagesForm.propertyGalleryNote")}
            </p>
            <div className="flex w-[100%] flex-wrap">
              {placeholders.map((num)=> (
                <div className="flex flex-col w-[260px] p-[10px]" key={num}>
                  <ImageUploader
                    value={formImages[num]}
                    onChange={(file)=> handleFileChange(num, file)}
                    onDelete={()=> handleFileChange(num, null)}
                  > 
                    <PencilSimple size='14' color='#ffffff'/>
                    <span className="text-[#93A0C3] text-[12px] mt-[10px]">
                      Click to add image
                    </span>
                  </ImageUploader>
                  <GeneralCheckbox
                    option={{
                      value: nanoid(),
                      display: t("propertyImagesForm.setThumbnail")
                    }}
                    disabled={!(formImages[num])}
                    className="flex mt-[10px]"
                    isChecked={thumbnailIdx == num}
                    onChange={(_op, isChecked)=> setThumbnailIdx(isChecked? -1 : num)}
                  />
                </div>
              ))}
              {placeholders.length < 20 && (
                  <Button
                    variant="ghost"
                    color="lime"
                    onClick={()=> setPlaceholders(prevState=> prevState.concat(prevState.length))}
                    className="grid place-items-center w-[240px] m-[10px] cursor-pointer border-[#5A6A93] h-[150px] border-[1px] rounded-[2px]"
                  >
                    <Plus size={40} color="lime"/>
                  </Button>
              )}
            </div>
           
          </div>
        </div>
      </div>
    </form>
  );
};

export default PropertyImagesForm;
