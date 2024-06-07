
type photosParams = {
  imagesAction: { fileId: string, action: 'DELETE' | 'EDIT' | 'THUMBNAIL' }[],
  assetPhotos: File[];
}

export const preparePhotosParams =(
  assetPhotosInitialState: IAssetMediaFiles[],
  formImages: (File | IAssetMediaFiles | null)[],
  thumbnailIdx: number
)=> {
  const photosParams : photosParams = {
    imagesAction: [],
    assetPhotos: []
  }
  let hasChangeOcurred = false;
  for (let i = 0; i < Math.max(formImages.length, assetPhotosInitialState.length, 11); i++){
    
    if (assetPhotosInitialState[i] === formImages[i]) continue // both are null

    if (!(formImages[i] instanceof File)){ //  previously uploaded (IAssetMediaFile) at this index or null
      const formAssetFile = formImages[i] as IAssetMediaFiles;
      if (assetPhotosInitialState[i]?.fileId === formAssetFile?.fileId) continue; // no change occured, both are same IAssetMediaFile
    }
    
    hasChangeOcurred = true;
    if (assetPhotosInitialState[i]) {// it's a delete/edit operation for this idx
      const changeAction = formImages[i] instanceof File ? 'EDIT' : 'DELETE';
      photosParams.imagesAction.push({
        fileId: assetPhotosInitialState[i].fileId as string,
        action: changeAction
      })
      if (changeAction === 'EDIT'){
        photosParams.assetPhotos.push(formImages[i] as File)
      }
    } else { // it's a file addition for this idx
      photosParams.assetPhotos.push(formImages[i] as File)
    }
  }

  let thumbnailFileName;
  if (thumbnailIdx === -1){
    const previouslySetThumbnail = assetPhotosInitialState.find((mediaFile: IAssetMediaFiles)=> mediaFile.isThumbnail);
    if (previouslySetThumbnail){ // means the user has removed the thumbnail check (-1) from a previously selected photo
      hasChangeOcurred = true
      photosParams.imagesAction.push({
        fileId: previouslySetThumbnail.fileId as string,
        action: 'THUMBNAIL'
      })
    }
  } else {
    const thumbnailFile = formImages[thumbnailIdx] && formImages[thumbnailIdx] as File | IAssetMediaFiles;
    if (
      thumbnailFile && "isThumbnail" in thumbnailFile && // it's an asset media file obj
      !thumbnailFile.isThumbnail // user selected a different, & previously uploaded image as thumbnail (if it's a thumbnail then no change requeried)
    ){
      hasChangeOcurred = true
      photosParams.imagesAction.push({
        fileId: thumbnailFile.fileId as string,
        action: 'THUMBNAIL'
      })
    } else if (thumbnailFile instanceof File) {
      hasChangeOcurred = true
      thumbnailFileName = thumbnailFile.name
    }
  }
  
  return { 
    photosParams: {
      ...photosParams,
      imagesAction: JSON.stringify(photosParams.imagesAction),
      ...(thumbnailFileName? {thumbnailFileName}:{})
    },
    hasChangeOcurred
   }
}