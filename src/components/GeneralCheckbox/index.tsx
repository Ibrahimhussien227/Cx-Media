"use client";

import React from "react";

import { IGeneralCheckboxProps } from "./type";

const Checkbox = ({ label, disabled, isChecked, onChange}: IGeneralCheckboxProps) => {



  return (
    <div className="flex flex-row items-center">
      <label className="container w-fit">
        <input
          disabled={disabled}
          type="checkbox"
          onChange={onChange}
          checked={isChecked}
        />
        <span className="checkmark"></span>
      </label>
      <span className="text-secondary text-[12px] text-left font-bold mt-[-2px]">
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
