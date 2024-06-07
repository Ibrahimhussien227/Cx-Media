"use client";

import React, { useState, ChangeEvent } from "react";

import { XCircle } from "@/utils/icons";
import UploadButton from "@/components/UploadButton";

const ImagesUploadWrapper = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImagesSelected = (files: File[]) => {
    // Do something with the selected images, e.g., upload to a server
    console.log("Selected Images:", files);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
      handleImagesSelected([...selectedImages, ...newImages]);
    }
  };

  const handleRemoveImage = (
    index: number,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    // Prevent the default button click behavior (form submission)
    event.preventDefault();

    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    handleImagesSelected(updatedImages);
  };

  return (
    <div className="flex w-full items-center ml-2">
      <UploadButton
        icon={{ props: { size: 14 }, name: "UploadSimple" }}
        required={true}
        name="Images"
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap">
        {selectedImages.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center h-[25px] text-secondary text-[12px] bg-lightBackground border-[1px] rounded-[15px] pl-[10px] pr-[10px] ml-[15px] my-[5px]"
          >
            <p className="whitespace-nowrap tracking-[0px]">{file.name}</p>

            <div
              className="cursor-pointer ml-[10px]"
              onClick={(event: React.MouseEvent<HTMLImageElement>) =>
                handleRemoveImage(index, event)
              }
            >
              <XCircle size={14} weight="fill" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesUploadWrapper;
