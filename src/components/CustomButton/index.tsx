import React from "react";

import { ICustomButtonProps } from "./type";

const CustomButton = (props: ICustomButtonProps) => {
  const { children } = props;

  return <button {...props}>{children}</button>;
};

export default CustomButton;
