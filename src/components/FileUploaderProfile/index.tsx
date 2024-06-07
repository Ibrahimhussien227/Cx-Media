import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { IFileUploaderProps } from "./type";
// import UploadButton from "../UploadButton";

const FileUploader = ({ label, readOnly }: IFileUploaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileInput = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const fileLocalUrl = URL.createObjectURL(ev.target.files[0]); // to display on the frontend (temporary so users can see how the end result would look like )

      setImagePreview(fileLocalUrl);
      setSelectedFile(ev.target.files[0]);
    }
    setTimeout(() => (ev.target.value = ""), 500);
  };

  return (
    <div className="flex w-[100%] flex-col">
      <label className="w-full capitalize text-[12px] font-bold mb-2">
        {label}
      </label>
      <div className="flex w-14 h-14 relative rounded-full">
        <input
          type="file"
          onChange={handleFileInput}
          readOnly={readOnly}
          disabled={readOnly}
          className="opacity-0 absolute top-0 bottom-0 left-0 right-0 z-10 cursor-pointer"
        />

        <div className="flex w-[52px] h-[52px] overflow-hidden rounded-[52px]">
          <Image
            width="100"
            height="100"
            src={imagePreview || "/images/profile-picture.svg"}
            alt="Selected File"
            className="m-auto relative top-0 bottom-0 left-0 right-0 "
          />
        </div>

        {!readOnly && (
          <PencilSimple
            size={32}
            className="ml-[10px] bg-[#F5F8FF] border w-[24px] h-[24px] rounded-[12px] p-[5px] m-auto absolute bottom-[-5px] right-[-5px]"
          />
        )}
      </div>
    </div>
  );
};

export default FileUploader;
