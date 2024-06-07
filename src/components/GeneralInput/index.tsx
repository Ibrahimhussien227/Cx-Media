import { forwardRef } from "react";
import { IGeneralInputProps } from "./type";
import { Lock } from "@/utils/icons";

const GeneralInput = forwardRef<HTMLInputElement, IGeneralInputProps>(
  (props, ref) => {
    return (
      <div className="flex items-center justify-center w-full">
        {props.label && (
          <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0">
            {props.label}
          </label>
        )}
        <div className="flex w-full relative">
          <input
            className={`h-[35px] p-2 bg-white border rounded-[2px] w-full text-[12px] cursor-default ${
              !props.readOnly && "focus:border-active cursor-text"
            } ${props.className}`}
            ref={ref}
            readOnly={props.readOnly}
            type={props.type}
            name={props.name}
            defaultValue={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
          {props.readOnly && (
            <Lock
              className="absolute right-2 top-[9px]"
              size={17}
              color="#2C3A5C"
            />
          )}
        </div>
        <div>{props.errormessage}</div>
        {props.children}
      </div>
    );
  }
);

GeneralInput.displayName = "GeneralInput";

export default GeneralInput;
