import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

import { Eye, X, Lock } from "@/utils/icons";
import FileDownloader from "../FileDownloader";
import UploadButton from "@/components/UploadButton";
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
      colored,
      className,
      downloadDisabled,
    },
    ref
  ) => {
    return (
      <div className={className}>
        {secondaryLabel && (
          <label className="w-full capitalize text-[12px] font-bold pl-2.5 mb-5">
            {secondaryLabel}
          </label>
        )}

        <div className="flex w-[100%] items-center">
          <div
            className={`flex flex-row items-center justify-between border p-1 ${
              edit ? "w-[80%]" : "w-full"
            }
            ${secondaryLabel ? "border py-2" : "py-1"} 
            ${
              colored
                ? "text-secondary text-[12px] font-bold bg-[#EDF7FF]"
                : "bg-white"
            }`}
          >
            <p className="text-[12px] pl-1 truncate ">
              {value && value?.length && <span>{value}</span>}
              {placeholder && !value && (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </p>
            <div
              className={`flex flex-row mr-2 ${
                secondaryLabel ? "gap-2" : "gap-5"
              }`}
            >
              {error && (
                <p className="text-red-500 mt-1 text-[12px]">{error}</p>
              )}

              {edit &&
                !readOnly &&
                (disabled ? (
                  <Lock size={17} color="#2C3A5C" />
                ) : (
                  <FileDownloader disabled={disabled} filePath={filePath} />
                ))}

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
              <div
                className={`ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] bg-white ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <Eye />
              </div>

              {onDelete ? (
                <div
                  onClick={onDelete}
                  className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer"
                >
                  <X />
                </div>
              ) : disabled ? (
                <div className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer bg-white">
                  <FileDownloader filePath={filePath} />
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
              <Eye className="ml-[10px] border w-[28px] h-[26px] rounded-[14px] bg-white p-[4px]" />
              {!downloadDisabled && (
                <div className="ml-[7px] border w-[28px] h-[26px] rounded-[14px] bg-white p-[5px] cursor-pointer">
                  <FileDownloader disabled={disabled} filePath={filePath} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

export default DownloadWrapper;

DownloadWrapper.displayName = "DownloadWrapper";
