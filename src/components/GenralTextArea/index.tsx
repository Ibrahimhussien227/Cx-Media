"use client";

import { forwardRef } from "react";

import * as icons from "@/utils/icons";
import { GenralTextAreaProps } from "./type";

const GenralTextArea = forwardRef<HTMLTextAreaElement, GenralTextAreaProps>(
  (
    {
      value,
      onChange,
      label,
      onBlur,
      onFocus,
      onKeyUp,
      note,
      placeholder,
      autoFocus,
      style,
      className = "",
      maxLength,
      icon,
      id,
      name,
      readonly,
      required = true,
      error,
      disabled,
    },
    ref
  ) => {
    const DisplayIcon = icon && icons[icon.name as keyof typeof icons];

    return (
      <div className="mb-1 relative" style={style}>
        {label && (
          <label
            className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5"
            htmlFor={id}
          >
            {label}
            {(note || required === false) && !readonly && (
              <p className="text-gray-400 mb-4 text-[12px]">
                {note} {required === false && " (optional)"}
              </p>
            )}
          </label>
        )}

        <div
          className={`
            flex items-center gap-4 relative border focus-within:border-secondary ${className}
            ${error ? "border-red-500" : "border-transparent"} ${
            readonly ? "" : "bg-[#F5F8FF80] p-1.5"
          }
        `}
        >
          {DisplayIcon && (
            <DisplayIcon
              size={26}
              weight="bold"
              {...(icon.props ? icon.props : {})}
            />
          )}
          <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            readOnly={readonly}
            autoFocus={autoFocus}
            name={name}
            onKeyUp={onKeyUp}
            id={id}
            maxLength={maxLength}
            onBlur={onBlur}
            onFocus={onFocus}
            rows={5}
            className="flex-grow bg-transparent outline-none text-[12px] font-medium"
          />
        </div>
        {error && <p className="text-red-500 mt-1 text-[12px]">{error}</p>}
      </div>
    );
  }
);

export default GenralTextArea;

GenralTextArea.displayName = "GenralTextArea";
