"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import * as icons from "@/utils/icons";
import { ImageInputProps } from "./types";
import UploadButton from "../UploadButton";

const ImageInput = ({
  value,
  imagesArray,
  onChange,
  onDelete,
  readonly,
  placeholder,
  className,
  required = true,
  disabled,
}: ImageInputProps) => {
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [uploadedImgTempURL, setUploadedImgTempURL] = useState<string>("");

  // reset the UI uploaded image when the [imagesArray] cleared
  useEffect(() => {
    // for the images with backend url
    if (imagesArray.length == 0 && value.url) {
      setUploadedImgTempURL(value.url);
      setHasChanged(false);
    }
    // for the images with no-backend url (newly created)
    else if (imagesArray.length == 0 && !value.url) setUploadedImgTempURL("");
  }, [imagesArray, value.url]);

  const handleFileUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const fileLocalUrl = URL.createObjectURL(ev.target.files[0]); // to display on the frontend (temporary so users can see how the end result would look like )

      setUploadedImgTempURL(fileLocalUrl);
      setHasChanged(true);
      onChange && onChange(ev.target.files[0]);
    }
    setTimeout(() => (ev.target.value = ""), 500);
  };

  const PlaceHolderIcon =
    placeholder &&
    placeholder.media.type === "icon" &&
    icons[placeholder.media.src as keyof typeof icons];

  return (
    <div
      className={`relative w-full mb-1 flex flex-col items-center justify-center 
      gap-2 capitalize bg-sky-100 ${className}`}
    >
      {!readonly && !disabled && (
        <div className="absolute top-2 right-2 w-full p-1 flex items-center justify-end gap-2">
          {value.url && uploadedImgTempURL && (
            <Link href={value.url ?? ""} passHref={true}>
              <button className="p-2 bg-white rounded-[50%] border-[1px] border-[#D4E4F2]">
                <icons.DownloadSimple size={16} weight="bold" />
              </button>
            </Link>
          )}
          <UploadButton
            className="p-2 bg-white rounded-[50%] border-[1px] border-[#D4E4F2]"
            icon={{
              name:
                value.url || uploadedImgTempURL
                  ? "PencilSimple"
                  : "UploadSimple",
              props: { size: 16, weight: "bold" },
            }}
            onChange={handleFileUpload}
            accept="image/*"
          />
          {!hasChanged && value.url && (
            <button
              onClick={onDelete}
              className="p-2 bg-white rounded-[50%] border-[1px] border-[#D4E4F2]"
            >
              <icons.X size={16} weight="bold" />
            </button>
          )}
        </div>
      )}

      {(value.url || uploadedImgTempURL) && (
        <Image
          width={200}
          height={200}
          className="w-full h-full object-cover"
          alt={value.alt}
          src={
            !readonly && uploadedImgTempURL
              ? uploadedImgTempURL
              : value.url || ""
          }
        />
      )}

      {!value.url && !uploadedImgTempURL && placeholder && (
        <>
          {PlaceHolderIcon ? (
            <PlaceHolderIcon {...placeholder.media.props} />
          ) : (
            <Image
              width={200}
              height={200}
              className="min-w-[50%] object-cover"
              alt={value.alt}
              src={placeholder.media.src || ""}
            />
          )}
          <label>
            {placeholder.label}
            {(placeholder.note || !required) && !readonly && (
              <span className="text-slate-400">
                {placeholder.note} {!required && " (optional)"}
              </span>
            )}
          </label>
        </>
      )}
    </div>
  );
};

export default ImageInput;
