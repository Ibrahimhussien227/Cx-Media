export interface ImageInputProps {
  value: { alt: string; url?: string };
  imagesArray: {
    fileId: string;
    uploadedImage: File | null;
  }[];
  onChange?: (file: File | null) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: {
    label: string;
    note?: string;
    media: {
      type: "icon" | "img";
      src: string;
      props?: object;
    };
  };
  readonly?: boolean;
  className?: string;
  label?: string;
  note?: string;
  required?: boolean;
  disabled?: boolean;
}
