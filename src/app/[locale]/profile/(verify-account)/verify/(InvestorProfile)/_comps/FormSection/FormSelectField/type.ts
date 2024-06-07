import { UseFormRegisterReturn } from "react-hook-form";

export interface IFormSelectFieldProps {
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn; // Replace 'any' with the appropriate type for register
  selectValue?: IOption | string; // Replace 'any' with the appropriate type for selectValue
  options?: IOption[]; // Replace 'any' with the appropriate type for options
  onChange?: (selectedOption: IOption) => void; // Replace 'any' with the appropriate type for onChange
  description: string;
  isLoading: boolean; // Specify the type as boolean for isLoading
  withSearch?: boolean;
}
