export interface ImediaFiles {
  fileId: string;
  fileKey: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  isThumbnail: boolean;
  assetId: string;
  uploadTimestamp: string;
  createdAt: string;
}

export interface IImagesFormProps {
  assetId: string;
  assetMediaFiles: ISingleCampaign["assetDetails"]["assetMediaFiles"];
}

export interface IImageSubmitForm {
  assetId: string;
  campaignImages: ImediaFiles[];
  thumbnailFileName: string;
  imagesArray: {
    fileId: string;
    uploadedImage: File | null;
  }[];
  fileIDs: {
    fileId: string;
    action: string;
  }[];
  DfileIDs: {
    fileId: string;
    action: string;
  }[];
  thumbnail: {
    fileId: string;
    action: string;
  };
}
