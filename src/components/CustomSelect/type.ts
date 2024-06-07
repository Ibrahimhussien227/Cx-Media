export interface CustomSelectProps {
  options: IOption[];
  value?: IOption | string;
  onChange: (selectedOp: IOption) => void;
  label?: string;
  note?: string;
  readonly?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
