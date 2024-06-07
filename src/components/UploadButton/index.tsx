import React, { forwardRef } from "react";

import * as icons from "@/utils/icons";
import { UploadButtonProps } from "./type";
import { UseFormRegister } from "react-hook-form";

interface IFormValues {}

const UploadButton = forwardRef<
  HTMLInputElement,
  UploadButtonProps & ReturnType<UseFormRegister<IFormValues>>
>(
  (
    {
      icon,
      error,
      required,
      onChange,
      label,
      accept,
      name,
      className,
      disabled,
    },
    ref
  ) => {
    const DisplayIcon = icon && icons[icon.name as keyof typeof icons];

    return (
      <>
        <div
          className={`overflow-hidden relative ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } ${className}`}
        >
          <button className="flex flex-row justify-center items-center gap-2">
            {DisplayIcon && (
              <DisplayIcon
                size={icon.props?.size || 14}
                {...(icon.props ? icon.props : {})}
              />
            )}
            {label && (
              <label className="text-[12px] font-medium">{label}</label>
            )}
            <input
              disabled={disabled}
              ref={ref}
              onChange={onChange}
              required={required}
              className={`${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              } absolute block opacity-0`}
              type="file"
              accept={accept}
              name={name}
            />
          </button>
        </div>
        {error && <p className="text-red-500 mt-1 text-[12px]">{error}</p>}
      </>
    );
  }
);

export default UploadButton;

UploadButton.displayName = "UploadButton";
