export interface IGeneralCheckboxProps {
  label?: string;
  disabled?: boolean;
  isChecked?: boolean;
  onChange?:(evt: React.ChangeEvent<HTMLInputElement>)=> void
}
