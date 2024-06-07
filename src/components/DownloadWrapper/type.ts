// import { IconProps } from "@phosphor-icons/react";

export interface IDownloadWrapperProps {
  value?: string;
  name?: string;
  error?: string;
  secondaryLabel?: string;
  filePath?: string;
  readOnly?: boolean;
  label?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  onDelete: (key: string) => void;
  edit?: boolean;
  placeholder?: string;
}
