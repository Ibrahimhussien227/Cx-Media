import React from "react";

import { ICustomButtonProps } from "./type";

const CustomButton = (props: ICustomButtonProps) => {
  const { className, ...restProps } = props;
  return (
    <button
      className={`text-[10px] font-bold tracking-[1.5px] text-center p-2 ${className}`}
      {...restProps}
    >
      {restProps.children}
    </button>
  );
};

export default CustomButton;
