import { forwardRef } from "react";
import { IGeneralTextareaProps } from "./type";
import { Lock } from "@/utils/icons/index";

const GeneralTextArea = forwardRef<HTMLTextAreaElement, IGeneralTextareaProps>(
  ({ label, ...props }, ref) => {
    return (
      <div
        // isInvalid={props.errormessage ? true : false}
        className="w-full flex items-center justify-center"
      >
        {label && (
          <label className="lg:min-w-[180px] min-w-[100px] font-semibold text-[10px] text-secondary flex tracking-[1.5px] mb-0">
            {label}
          </label>
        )}
        <div className="flex w-full relative">
          <textarea
            className={`w-full h-[80px] outline-none p-2 bg-white rounded-[2px] border text-[12px] resize-none cursor-default ${
              !props.readOnly && "cursor-text focus:border-active"
            }`} // Added 'resize-none' to disable resizing
            placeholder={props.placeholder}
            ref={ref}
            readOnly={props.readOnly}
            {...props}
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

GeneralTextArea.displayName = "GeneralInput";

export default GeneralTextArea;
