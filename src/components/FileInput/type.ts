import { IconProps } from "@phosphor-icons/react";

export interface FileProps {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | { name: string };
  // onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  icon?: {
    name: string;
    props?: IconProps;
  };
  required?: boolean;
  className?: string;
  error?: string;
  accept?: string;
  secondaryLabel?: string;
}
