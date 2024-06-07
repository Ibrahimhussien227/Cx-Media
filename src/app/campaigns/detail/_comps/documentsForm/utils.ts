
import { fileKeysEnum } from "@/types/enum.constants"
import { doxParams, namedFile, otherDoxParams} from "./type";

export const getFormFiles = (mediaFiles?: IAssetMediaFiles[]) => {
  const fileFields 
  : Partial<Record<keyof typeof fileKeysEnum, IAssetMediaFiles | File | IAssetMediaFiles[] | File[] | null>> = 
    Object.values(fileKeysEnum).reduce((fields, key) => {
      if (key === fileKeysEnum.otherDocuments){
        return {...fields, otherDocuments: []}
      }
      return {...fields, [key]: null}
  }, {});


  if (!mediaFiles) return fileFields;

  for (let fileObj of mediaFiles) {
    if (fileObj.fileKey == fileKeysEnum.otherDocuments){
      const otherDocs = fileFields.otherDocuments as IAssetMediaFiles[];
      fileFields.otherDocuments = otherDocs.concat(fileObj)
    } else {
      fileFields[fileObj.fileKey as fileKeysEnum] = fileObj;
    }
  }

  return fileFields;
}


export const prepareDocxParams =(
  docxCurrentState: Partial<Record<keyof typeof fileKeysEnum,  IAssetMediaFiles | IAssetMediaFiles[] | File | File[] | null >>,
  docxInitialState: Partial<Record<keyof typeof fileKeysEnum, IAssetMediaFiles | IAssetMediaFiles[] | File | File[] | null>>
)=> {
  const docxParams: doxParams = {
    documentsAction: [],
  };
  let hasChangeOcurred = false;
  for (let field in docxInitialState) {
    
    if (docxInitialState[field as fileKeysEnum] === docxCurrentState[field as fileKeysEnum]) continue; // null

    const fieldMediaObj = docxInitialState[field as fileKeysEnum] as IAssetMediaFiles;

    if (! (docxCurrentState[field as fileKeysEnum] instanceof File)) {
      const newDoc = docxCurrentState[field as fileKeysEnum] as IAssetMediaFiles;
      if (newDoc?.fileId === fieldMediaObj?.fileId) continue // same assetMediaFile
    }
    
    // a change occured from client (a new file is uploaded / old file delete)
    
    
    if (fieldMediaObj) { // smth existed, a change happend to the field
      hasChangeOcurred = true;
      const changeAction = docxCurrentState[field as fileKeysEnum] instanceof File ? 'EDIT' : 'DELETE';
      docxParams.documentsAction.push({
        fileId: fieldMediaObj.fileId as string,
        action: changeAction
      });
      if (changeAction === 'EDIT'){ // append the replacing file
        docxParams[field as keyof typeof docxParams] = docxCurrentState[field as fileKeysEnum] as File;
      }
    } else if (docxCurrentState[field as fileKeysEnum]) { // while no mediaObj inititally so it's a new file added
      hasChangeOcurred = true;
      docxParams[field as keyof typeof docxParams] = docxCurrentState[field as fileKeysEnum] as File;
    }
  }
  return { 
    documentsParams: docxParams,
    hasChangeOcurred
  }
}


export const prepareOtherDoxParams =(
  otherDoxInitialState: IAssetMediaFiles[],
  otherDoxCurrentState: namedFile[]
) => {
  const result : otherDoxParams = {
    documentsAction: [],
    otherDocuments: [],
    otherDocumentsParam: []
  }
  let hasOtherDoxChanged = false;

  for (let i = 0; i < Math.max(otherDoxInitialState.length, otherDoxCurrentState.length); i++){
    if (otherDoxCurrentState[i]?.file){ // an object present in this idx
      
      if (otherDoxInitialState[i] === otherDoxCurrentState[i].file) continue; // null
      
      if (! (otherDoxCurrentState[i].file instanceof File)) {
        const newDoc = otherDoxCurrentState[i].file as IAssetMediaFiles;
        if (newDoc?.fileId === otherDoxInitialState[i]?.fileId) continue // same assetMediaFile
      }

      hasOtherDoxChanged = true;
      const uploadedFile = otherDoxCurrentState[i].file as File;
      result.otherDocuments?.push(uploadedFile);
      result.otherDocumentsParam?.push({
        documentName: otherDoxCurrentState[i].name || "",
        originalFileName: uploadedFile.name
      })

      if (otherDoxInitialState[i]){ // there was smth here initially, an EDIT process took place
        result.documentsAction?.push({
          fileId: otherDoxInitialState[i].fileId as string,
          action: "EDIT"
        });
      }
      
    } else if (otherDoxInitialState[i]) {// no new file exist in this idx, but there was one initially.. DELETE
      hasOtherDoxChanged = true;
      result.documentsAction?.push({
        fileId: otherDoxInitialState[i].fileId as string,
        action: "DELETE"
      });
    } 
  }


  return {
    hasOtherDoxChanged,
    result : {
      ...result,
      otherDocumentsParam: result.otherDocumentsParam && JSON.stringify(result.otherDocumentsParam)
    }
  }
} 