export interface IPhoneInputProps {
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  isLoading?: boolean;
  label: string;
  errors?: string;
  isReadOnly?: boolean;
  onChangeCountryCode?: (value: string) => void;
  countryCode?: string;
}

export type ICountryCodeType = {
  name: string;
  code: string;
  dial_code: string;
};
