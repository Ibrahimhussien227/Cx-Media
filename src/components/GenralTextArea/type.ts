import { IconProps } from "@phosphor-icons/react";

export interface GenralTextAreaProps {
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  onBlur?: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (evt: React.KeyboardEvent) => void;
  readonly?: boolean;
  id?: string;
  name?: string;
  icon?: {
    name: string;
    props?: IconProps;
  };
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  error?: string;
  note?: string;
  maxlength?: number;
  disabled?: boolean;
}
