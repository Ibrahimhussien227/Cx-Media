
import { IconProps } from "@phosphor-icons/react";

export interface InputProps {
  value?: string | number;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (evt: React.FocusEvent) => void;
  onFocus?: (evt: React.FocusEvent) => void;
  onKeyUp?: (evt: React.KeyboardEvent) => void;
  readOnly?: boolean;
  type?: string;
  id?: string;
  name?: string;
  suffix?: string;
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
  maxlength?: number;
  isTextArea?: boolean;
  min?: number
}

export interface IDebouncedInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  debounce?: number;
}

export interface ILabeledInputProps extends InputProps {
  label: string;
  note?: string
}