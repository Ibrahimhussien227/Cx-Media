import React, { forwardRef } from "react";

import { FileProps } from "./type";
import UploadButton from "../UploadButton";
import { UseFormRegister } from "react-hook-form";
import FileDownloader from "../FileDownloader";

interface IFormValues {}

const FileInput = forwardRef<
  HTMLInputElement,
  FileProps & ReturnType<UseFormRegister<IFormValues>>
>(
  (
    { value, label, onChange, required = false, error, secondaryLabel, name },
    ref
  ) => {
    return (
      <div>
        {secondaryLabel && (
          <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
            {secondaryLabel}
          </label>
        )}
        <div
          className={`flex flex-row items-center justify-between bg-[#F5F8FF80] p-1 ${
            secondaryLabel ? "border py-2" : "py-4"
          } `}
        >
          <p className="text-[12px] font-medium pl-1">
            {(value && (value[0]?.name as string)) || value}
          </p>
          <div
            className={`flex flex-row mr-2 ${
              secondaryLabel ? "gap-2" : "gap-5"
            }`}
          >
            <UploadButton
              icon={{ props: { size: 14 }, name: "PencilSimple" }}
              label={label}
              ref={ref}
              onChange={onChange}
              required={required}
              name={name}
            />
            {error && <p className="text-red-500 mt-1 text-[12px]">{error}</p>}

            <FileDownloader />
          </div>
        </div>
      </div>
    );
  }
);

export default FileInput;

FileInput.displayName = "FileInputs";
