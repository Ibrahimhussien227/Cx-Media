

export type namedFile = {
  name?: string;
  file: IAssetMediaFiles | File | null;
}

export interface IFileListUploaderProps {
  onChange: (newNamedFiles: namedFile[])=> void;
  showNameInput?: boolean;
  addBTnText?: string;
  readOnly?: boolean;
  namedFiles: namedFile[];
  fileUploaderProps?: {
    placeholder?: string;
    className?: string;
  },
}