export interface InputProps {
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (evt: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (evt: React.KeyboardEvent) => void;
  readOnly?: boolean;
  type?: string;
  id?: string;
  name?: string;
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
  children?: React.ReactNode;
}
