import React from "react";

import CustomSelect from "@/components/CustomSelect";
import GeneralInput from "@/components/GeneralInput";
import { IFormSelectFieldProps } from "./type";

const FormField = ({
  label,
  placeholder,
  register,
  selectValue,
  options,
  onChange,
  description,
  isLoading,
  withSearch,
}: IFormSelectFieldProps) => {
  // Your code here

  return (
    <div className="w-full flex flex-row mt-3 gap-5">
      <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
        {label}
      </div>
      <div className="w-[25%]">
        {!options ? (
          <GeneralInput
            readOnly={isLoading}
            type="text"
            placeholder={placeholder}
            {...register}
          />
        ) : (
          <CustomSelect
            withSearch={withSearch}
            readonly={isLoading}
            className="w-full"
            value={selectValue}
            options={options}
            onChange={onChange}
          />
        )}
      </div>
      <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
        {description}
      </p>
    </div>
  );
};

export default FormField;
