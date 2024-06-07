import { completionStatus, fileKeysEnum } from "@/types/enum.constants"


export const getAmentiesStatus =(campaignDetails:ICampaignDetails) : completionStatus => {
  return campaignDetails.assetDetails?.assetAmenities?.length?
    completionStatus.COMPLETE
  :
   completionStatus.PENDING
}

export const getOverviewStatus =(campaignDetails:ICampaignDetails) : completionStatus=> {
  return campaignDetails?.assetDetails?.completionStatus || completionStatus.PENDING;
}

export const getLocationStatus =(campaignDetails:ICampaignDetails) : completionStatus=> {
  return campaignDetails?.assetDetails?.assetLocation?.completionStatus || completionStatus.PENDING;
}

export const getFinancialStatus =(campaignDetails:ICampaignDetails) : completionStatus=> {
  return campaignDetails?.financialDetails?.completionStatus || completionStatus.PENDING;
}

export const getImagesStatus =(campaignDetails:ICampaignDetails) : completionStatus => {
  const assetImageFiles = campaignDetails.assetDetails?.assetMediaFiles?.filter(file=> file.fileType.startsWith("image"))
  return (assetImageFiles?.length || 0) >= 11 ? completionStatus.COMPLETE : completionStatus.PENDING;
}

export const essentialdocumentsKeys = new Set([
  fileKeysEnum.titleDeedFile,
  fileKeysEnum.valuationReportFile,
  fileKeysEnum.projectionReportFile
])

export const getDocumentsStatus =(campaignDetails:ICampaignDetails) : completionStatus => {

  // documents,  these  must exist
  const documentsFiles = campaignDetails.assetDetails?.assetMediaFiles?.filter(file=> essentialdocumentsKeys.has(file.fileKey))
  return (documentsFiles?.length || 0) === essentialdocumentsKeys.size ? completionStatus.COMPLETE : completionStatus.PENDING;
}


