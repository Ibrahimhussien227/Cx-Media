import { Dispatch, SetStateAction } from "react";

export interface PhoneInputProps {
  placeholder?: string;
  label?: string;
  note?: string;
  setCountryCode?: (code?: string)=> void;  
  countryCodeValue?: string; 
  phoneNumberValue?: string; 
  setPhoneNumber?: (val?: string)=> void;

}

export type CountryCodeType = {
  name?: string;
  code?: string;
  dial_code?: string;
};
