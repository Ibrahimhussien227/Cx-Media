export interface IImageCardProps {
  onChange: (file: File | null) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onthumbnail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgUrl: string;
  imagesArray: {
    fileId: string;
    uploadedImage: File | null;
  }[];
  thumbnail?: boolean;
  fileId: string;
  disabled?: boolean;
}
