import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

import { Eye, X } from "@/utils/icons";
import FileDownloader from "../FileDownloader";
import UploadButton from "../UploadButton";
import { IDownloadWrapperProps } from "./type";

interface IFormValues {}

const DownloadWrapper = forwardRef<
  HTMLInputElement,
  IDownloadWrapperProps & ReturnType<UseFormRegister<IFormValues>>
>(
  (
    {
      value,
      label,
      onChange,
      required = false,
      error,
      secondaryLabel,
      name,
      filePath,
      readOnly,
      disabled,
      accept,
      onDelete,
      edit,
      placeholder,
    },
    ref
  ) => {
    return (
      <div>
        {secondaryLabel && (
          <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
            {secondaryLabel}
          </label>
        )}

        <div className="flex w-full items-center">
          <div
            className={`flex flex-row items-center w-full justify-between bg-[#F5F8FF80] p-1 border py-2 `}
          >
            <p className="text-[12px] font-medium pl-1">
              {value?.length ? value : placeholder ?? ""}
            </p>
            <div
              className={`flex flex-row mr-2 ${
                secondaryLabel ? "gap-2" : "gap-5"
              }`}
            >
              {error && (
                <p className="text-red-500 mt-1 text-[12px]">{error}</p>
              )}

              {edit && !readOnly && (
                <FileDownloader disabled={disabled} filePath={filePath} />
              )}

              {!edit && !readOnly && (
                <UploadButton
                  icon={{ props: { size: 14 }, name: "UploadSimple" }}
                  label={label}
                  ref={ref}
                  onChange={onChange}
                  required={required}
                  name={name}
                  disabled={disabled}
                  accept={accept}
                />
              )}
            </div>
          </div>

          {edit && (
            <>
              <Eye className="ml-[10px] border w-[28px] h-[28px] rounded-[14px] p-[5px]" />

              {onDelete ? (
                <div
                  onClick={onDelete}
                  className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer"
                >
                  <X />
                </div>
              ) : (
                <div className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer">
                  <UploadButton
                    icon={{
                      props: { size: 14 },
                      name: "PencilSimple",
                    }}
                    label={label}
                    ref={ref}
                    onChange={onChange}
                    required={required}
                    name={name}
                    disabled={disabled}
                    accept={accept}
                  />
                </div>
              )}
            </>
          )}

          {readOnly && (
            <>
              <Eye className="ml-[10px] border w-[28px] h-[28px] rounded-[14px] p-[5px]" />

              <div className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer">
                <FileDownloader disabled={disabled} filePath={filePath} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default DownloadWrapper;

DownloadWrapper.displayName = "DownloadWrapper";
