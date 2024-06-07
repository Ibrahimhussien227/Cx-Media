import React from "react";
import { IGeneralCheckboxProps } from "./type";

const GeneralCheckbox = ({
  label,
  disabled,
  checked,
  onChange,
}: IGeneralCheckboxProps) => {
  return (
    <div className="checkbox-container">
      <input
        onChange={onChange}
        type="checkbox"
        checked={checked}
        disabled={disabled}
      />
      {label && (
        <label className="text-secondary text-[12px] text-left font-medium">
          {label}
        </label>
      )}
    </div>
  );
};

export default GeneralCheckbox;
