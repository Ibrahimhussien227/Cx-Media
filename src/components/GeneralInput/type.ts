export interface IGeneralInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  errormessage?: string;
  type?: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent) => void;
  readOnly?: boolean;
}
