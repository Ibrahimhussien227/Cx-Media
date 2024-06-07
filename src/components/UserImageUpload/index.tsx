"use client";

import React, { ChangeEvent, useState } from "react";
// import { userProfileBig, edit } from "@/../public/icons";
import Image from "next/image";
import { PencilSimple, User } from "@/utils/icons";

const UserImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setSelectedFile(file);

      // Read the content of the file as a data URL for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  console.log(selectedFile);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(selectedFile);
  // };

  return (
    <div className="flex w-[70px] h-[70px] relative rounded-[70px] ">
      <input
        type="file"
        onChange={handleFileInput}
        className="opacity-0 absolute top-0 bottom-0 left-0 right-0 z-10"
      />

      {imagePreview ? (
        <div className="flex w-[70px] h-[70px] overflow-hidden rounded-[70px]">
          <Image
            width={100}
            height={100}
            src={imagePreview}
            alt="Selected File"
            className="m-auto relative top-0 bottom-0 left-0 right-0 "
          />
        </div>
      ) : (
        <div className="p-4 border rounded-full">
          <User size={32} />
        </div>
      )}
      {!imagePreview && (
        <div className="p-1 bg-[white] rounded-full absolute right-0 top-1">
          <PencilSimple size={11} />
        </div>
      )}
    </div>
  );
};

export default UserImageUploader;
