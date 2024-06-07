import React from "react";

import { ISwitchButtonProps } from "./type";

const SwitchButton = ({
  children,
  value,
  onChange,
  isDisabled,
}: ISwitchButtonProps) => {
  return (
    <label className="inline-flex justify-between items-center py-2.5">
      {/* {label && (
        <span className="text-[12px] font-bold text-secondary">{label}</span>
      )} */}

      {children}
      <div className="relative cursor-pointer">
        <input
          disabled={isDisabled}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-7 h-4 bg-[#F5FAFF] border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-[#2C3A5C]" />
      </div>
    </label>
  );
};

export default SwitchButton;
