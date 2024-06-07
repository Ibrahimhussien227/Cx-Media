"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";
import { DownloadSimple} from '@/utils/icons';
import { useTranslation } from "react-i18next";
import { ITrackedForm } from "../../_sections/property-detail/types";
import { getFormFiles, prepareDocxParams, prepareOtherDoxParams } from "./utils";
import { completionStatus, fileKeysEnum } from "@/types/enum.constants";
import { useAddAssetDocsMutation } from "@/store/services/campaign/assetMediaApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { convertObjToFormData } from '@/utils/convertObjToFormData';
import FileListUploader from '@/components/FileListUploader';
import { namedFile } from "./type";
import useOnUnmount from "@/hooks/useOnUnmount";
import { essentialdocumentsKeys, getDocumentsStatus } from "../../utils";

const DocumentsForm = ({formId, updateTracker, campaignDetails, configActionBtn}:ITrackedForm) => {
  const {t} = useTranslation("campaignsPage");

  const documentsInitialeState = useMemo(
    ()=>{
      const filefields = getFormFiles(campaignDetails.assetDetails?.assetMediaFiles)
      delete filefields.assetPhotos;
      return filefields;
    } ,
    [campaignDetails.assetDetails?.assetMediaFiles]
  )
  const [assetDocuemnts, setAssetDocuments] = useState(documentsInitialeState);

  const otherDoxInitialState = documentsInitialeState.otherDocuments as IAssetMediaFiles[]
  const [otherDocuments, setOtherDocuments] = useState<namedFile[]>(
    otherDoxInitialState?.map((docObj:IAssetMediaFiles)=> ({file: docObj, name: docObj?.fileName}))
  );

  const [addAssetDocs, {isSuccess, error}] = useAddAssetDocsMutation();


  useEffect(()=> {
    if (!configActionBtn) return;
    const {documentsParams, hasChangeOcurred} = prepareDocxParams(assetDocuemnts, documentsInitialeState);
    const {result, hasOtherDoxChanged} = prepareOtherDoxParams(otherDoxInitialState, otherDocuments);

    const documentsAction = documentsParams.documentsAction.concat(result.documentsAction || []);

    if (hasChangeOcurred || hasOtherDoxChanged){
      configActionBtn({
        disabled: false,
        onClick: ()=> addAssetDocs({
          campaignId: campaignDetails.campaignId,
          params: convertObjToFormData({
            assetId: campaignDetails.assetId as string,
            ...documentsParams,
            ...result,
            documentsAction: JSON.stringify(documentsAction)
          })
        })
      })
    } else {
      configActionBtn({disabled: true})
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetDocuemnts, otherDocuments])

  const autoSaveOnLeave = useCallback(()=> { // auto save upon leaving the form, added for convenience 
    const {documentsParams, hasChangeOcurred} = prepareDocxParams(assetDocuemnts, documentsInitialeState);
    const {result, hasOtherDoxChanged} = prepareOtherDoxParams(otherDoxInitialState, otherDocuments);

    const documentsAction = documentsParams.documentsAction.concat(result.documentsAction || []);
    
    if (hasChangeOcurred || hasOtherDoxChanged){
      addAssetDocs({ 
        campaignId: campaignDetails.campaignId,
        params: convertObjToFormData({
          assetId: campaignDetails.assetId as string,
          ...documentsParams,
          ...result,
          documentsAction: JSON.stringify(documentsAction)
        })
      })
    }
  }, [addAssetDocs, assetDocuemnts, campaignDetails.assetId, campaignDetails.campaignId, documentsInitialeState, otherDocuments, otherDoxInitialState])
  
  useOnUnmount(autoSaveOnLeave)

  useEffect(()=> {
    if (!updateTracker) return;
    if (
      Object.entries(assetDocuemnts).filter(([fieldKey, fieldVal])=> {
        return !(fieldVal instanceof Array) && Boolean(fieldVal) && essentialdocumentsKeys.has(fieldKey as fileKeysEnum) // not array (other docs), nor null 
      }).length === essentialdocumentsKeys.size
    ){
      updateTracker(formId, completionStatus.COMPLETE)
    } else {
      updateTracker(formId, completionStatus.PENDING)
    }
  }, [assetDocuemnts, formId, updateTracker])

  useEffect(()=> {
    if (isSuccess && configActionBtn){
      configActionBtn({disabled: true})
    }
  }, [isSuccess, configActionBtn])

  useEffect(()=> {
    setAssetDocuments(documentsInitialeState)
  }, [documentsInitialeState])
 
  const handleFileChange = (filedName: string, file: File | null) => {
    let fieldNewVal: File | null | IAssetMediaFiles;
    if (
      file === null && // user is removing
      assetDocuemnts[filedName as fileKeysEnum] !== documentsInitialeState[filedName as fileKeysEnum] // removing the file he uploaded
    ){ 
      fieldNewVal = documentsInitialeState[filedName as fileKeysEnum] as IAssetMediaFiles | null; // reset to initial value
    } else {
      fieldNewVal = file // apply new value, even if null
    }
    setAssetDocuments(prevState=> ({...prevState,
      [filedName]: fieldNewVal
    }))
   
  };

  return (
    <form className="flex flex-col justify-center gap-y-4 items-center w-full">
      {error && 
        <p className="text-red-500 text-[10px]">{getErrorMessage(error)}</p>
      }
      {Object.entries(assetDocuemnts).map(([fieldName, fileData])=>{
        if (fieldName === fileKeysEnum.otherDocuments){
          return null
        }
        return (
          <div className="flex w-full items-center" key={fieldName}>
           
            <FileUploader
              onFileChange={(file)=> handleFileChange(fieldName, file)}
              label={t(`documentsForm.${fieldName}`)}
              placeholder={t(`documentsForm.${fieldName}Placeholder`)}
              value={fileData as IAssetMediaFiles | File | null}
              note= {t(`documentsForm.${fieldName}Content`)}
              onRemove={()=> handleFileChange(fieldName, null)}
              className="w-full"
            />
          
          </div>
        );
      })}
      <div className="flex w-full items-center">
        <div className="flex w-[60%] pl-[22%]">
          <Link
            href={""}
            className="text-[#FFFFFF] ml-[5px] text-[10px] tracking-[1.5px] font-bold flex"
          >
            {" "}
            <DownloadSimple size="14" color="#ffffff" className="mr-[5px]" />
            {t("documentsForm.downloadTemplate")}
          </Link>
        </div>
      </div>
      <div className='flex w-full items-center'>
      <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-5 justify-center w-[100%]">        
          <label className="font-semibold text-[10px] text-[#93A0C3] mt-[10px] flex tracking-[1.5px] mb-0 ">
            {t("documentsForm.otherDocuments")}
          </label>
          <FileListUploader
              namedFiles={otherDocuments}
              onChange={(newOtherDox)=> setOtherDocuments(newOtherDox)}
              addBTnText={t("documentsForm.addDocument")}
            />
          <span className="text-[#93A0C3] text-[12px] tracking-[0px] pl-[20px] border-l-[1px] self-start">
            {t("documentsForm.otherDocumentsContent")}
          </span>
        </div>
      </div>
     
    </form>
  );
};

export default DocumentsForm;
