import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { UseFormRegister } from "react-hook-form";

import { ICustomDatePickerProps } from "./type";
import TextInput from "../TextInput";
import * as ICONS from "@/utils/icons";

interface IFormValues {}

const CustomDatePicker = ({
  errormessage,
  label,
  onChange,
  value,
  formatString,
  className,
  disabled,
  placeholder,
  icon,
}: ICustomDatePickerProps & ReturnType<UseFormRegister<IFormValues>>) => {
  const convert = (selected: string) => {
    if (selected) {
      return new Date(selected);
    } else {
      return null;
    }
  };

  const IconName = icon && ICONS[icon as keyof typeof ICONS];

  return (
    <div className="flex flex-col justify-center w-full">
      <DatePicker
        disabled={disabled}
        placeholderText="Please select a date"
        onChange={(date: Date) =>
          onChange(format(date, formatString ?? "dd MM yyyy"))
        }
        minDate={new Date()}
        selected={convert(value)}
        dateFormat="dd MM yyyy" // Customize the date format
        todayButton="Today" // Display "Today" button
        customInput={
          <div className="relative w-full">
            <TextInput
              label={label}
              value={value ?? ""}
              type="text"
              placeholder={placeholder ?? `Select a date`}
              className={`flex-grow outline-none text-[10px] border w-full ${
                className ?? "h-[32px] px-[5px] bg-[#F5F8FF80]"
              }`}
            />
            {IconName && (
              <span
                className={`absolute right-2 ${
                  label ? "top-[32px]" : "top-[9px]"
                }`}
              >
                <IconName size={15} />
              </span>
            )}
          </div>
        }
      />
      {errormessage && <div>{errormessage}</div>}
    </div>
  );
};

export default CustomDatePicker;
