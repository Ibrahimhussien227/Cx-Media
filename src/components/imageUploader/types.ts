

export interface ImageUploaderProps {
  children: string | React.ReactNode;
  value?: { fileName?: string; filePath: string; } | File | null;
  onChange?: (file:File | null)=> void,
  readOnly?: boolean;
  className?: string;  
  onDelete?: Function
}