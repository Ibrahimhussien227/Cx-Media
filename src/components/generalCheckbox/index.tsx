import React from "react";
import { ICheckboxProps } from "./types";

const GeneralCheckbox = ({
    onChange,
    isChecked = false,
    option,
    className,
    disabled
}: ICheckboxProps) => {
  return (
    <div className={`flex mt-2 ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={()=> onChange(option, isChecked)}
        id={option.value}
      />
      <label
        className="text-[12px] text-[#ffffff] flex ml-2"
        htmlFor={option.value}
      >
        {option.display}
      </label>
    </div>
  );
};

export default GeneralCheckbox;
