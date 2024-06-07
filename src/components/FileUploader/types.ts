interface IFileUploaderProps {
    onFileChange: (file: File | null) => void;
    label?: string;
    placeholder: string;
    value?: File | IMediaFiles | null;
    accept?: string;
    note?: string;
    className?: string;
    onRemove?: Function;
    readOnly?: boolean;
  }