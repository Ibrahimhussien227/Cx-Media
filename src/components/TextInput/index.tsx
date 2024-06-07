"use client";

import { forwardRef } from "react";

import { InputProps } from "./types";
import { Lock } from "@phosphor-icons/react/dist/ssr";

const TextInput = forwardRef<HTMLInputElement, InputProps>(
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
      type = "text",
      id,
      name,
      readOnly,
      required,
      error,
      disabled,
      children,
    },
    ref
  ) => {
    return (
      <div className="mb-1 relative" style={style}>
        {label && (
          <label
            className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5"
            htmlFor={id}
          >
            {label}
            {(note || required === false) && !readOnly && (
              <p className="text-gray-400 mb-4 text-[12px]">
                {note} {required === false && " (optional)"}
              </p>
            )}
          </label>
        )}

        <div
          className={`
            flex items-center gap-4 relative border focus-within:border-secondary bg-[#F5F8FF80] p-1.5 ${className}
            ${error ? "border-red-500" : "border-transparent"}
        `}
        >
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            autoFocus={autoFocus}
            name={name}
            onKeyUp={onKeyUp}
            id={id}
            maxLength={maxLength}
            onBlur={onBlur}
            onFocus={onFocus}
            className="flex-grow bg-transparent outline-none text-[12px] font-medium"
          />

          {children}
          {readOnly && (
            <Lock className="absolute right-0 top-[10px] mr-2 z-50 bg-white" />
          )}
        </div>
        {error && <p className="text-red-500 mt-1 text-[12px]">{error}</p>}
      </div>
    );
  }
);

export default TextInput;

TextInput.displayName = "TextInput";
