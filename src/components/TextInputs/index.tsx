

"use client";

import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

import * as icons from "@/utils/icons";
import { IDebouncedInputProps, ILabeledInputProps, InputProps } from "./types";

export const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      onFocus,
      onKeyUp,
      placeholder,
      autoFocus,
      style,
      className = "",
      maxLength,
      icon,
      type = "text",
      id,
      name,
      readOnly,
      required = true,
      error,
      isTextArea = false,
      suffix = '',
      min = 0
    },
    ref
  ) => {
    const DisplayIcon = icon && icons[icon.name as keyof typeof icons] || readOnly && icons.Lock;

    const iconProps = icon?.props || {};
    if (readOnly){
      iconProps.style = {...iconProps.style, order: 1, alignSelf: 'start', flexShrink: 0}
      iconProps.weight = "regular"
    }

    const sharedProps = {
      type: type,
      value: value || '',
      onChange: onChange,
      placeholder: readOnly ? "" : placeholder,
      required: required,
      min,
      readOnly,
      autoFocus,
      name,
      onKeyUp,
      id,
      maxLength,
      onBlur,
      onFocus,
      className: `outline-none w-full font-regular bg-[#232F4B] rounded-[2px] placeholder-[#93A0C3] ${isTextArea? 'h-[85px] resize-none': ''}`
    }

    return (
      <div className={` relative ${className}`}>
        <div
          className={`
            flex items-center gap-2 justify-between relative border focus-within:border-secondary px-2.5 py-2 bg-[#232F4B]
            ${error ? "border-red-500" : "border-transparent"} text-[12px]
        `}
        style={style}
        >
          {DisplayIcon && (
            <DisplayIcon
              size={20}
              weight="bold"
              {...(iconProps)}
            />
          )}
          {isTextArea? (
            <textarea
              ref={ref as ForwardedRef<HTMLTextAreaElement>}
              {...sharedProps}
            />
          ):(
            <input
              ref={ref as ForwardedRef<HTMLInputElement>}
              {...sharedProps}
            />
          )}
          {suffix && <span className="text-[#93A0C3] shrink-0 self-end">{suffix}</span>}
        </div>
        {error && <p className="text-red-500 mt-1 text-[12px]">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: IDebouncedInputProps) => {
  
  const [value, setValue] = useState(initialValue);
  const timerId = useRef<number>();

  useEffect(() => { 
    setValue(initialValue);
  }, [initialValue]);

  const handleChange =(ev:React.ChangeEvent)=> {
    const eventTarget = ev.target as HTMLInputElement
    setValue(eventTarget.value)

    clearTimeout(timerId.current)

    timerId.current = window.setTimeout(()=> {
      console.log('calling on change')
      onChange(eventTarget.value)
    }, debounce)

  }

  return (
    <TextInput
      className="h-[28px] w-[135px] rounded-sm bg-[#ffffff] text-[#2C3A5C] text-[12px] font-normal "
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export const LabeledInput = forwardRef<HTMLInputElement, ILabeledInputProps>(
  (
    {label, note, className, ...props},
    ref
  ) => {
    return (
      <div className={`grid sm:grid-cols-[0.5fr_1fr_1fr] grid-cols-[0.5fr_1fr] gap-5 justify-center ${className}`}>
        <label className="inline-block font-bold text-[10px] text-[#93A0C3] tracking-[1.5px] mb-0">
          {label}
        </label>
        <TextInput
          ref={ref}
          {...props}
        />
        {note && (
        <span className="text-[#93A0C3] text-[12px] tracking-[0px] sm:flex hidden shrink-none pl-[20px] border-l-[1px]">
          {note}
        </span>
        )}
      </div>
    );
  }
)

LabeledInput.displayName = "LabeledInput";