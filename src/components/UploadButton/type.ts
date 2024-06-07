import { IconProps } from "@phosphor-icons/react/dist/lib/types";

export interface UploadButtonProps {
  disabled?: boolean;
  label?: string;
  icon: {
    name: string;
    props?: IconProps;
  };
  required?: boolean;
  className?: string;
  error?: string;
  accept?: string;
  name?: string;
}
