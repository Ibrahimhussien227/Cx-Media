"use client"
import React, { ChangeEvent, useRef, useState } from 'react';

import  { PencilSimple, Trash }  from "../../utils/icons";
import { ImageUploaderProps } from './types';

const ImageUploader = ({
  children : placeholder,
  value,
  onChange,
  onDelete,
  className,
  readOnly
}:ImageUploaderProps) => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    
    onChange && onChange(file);

    if (file) {

      // Read the content of the file as a data URL for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileInputClick = () => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
  
    if (fileInputRef.current){
      fileInputRef.current.value = ''
    }
    // Implement your delete logic here
    onDelete && onDelete()
  };

  return (
    <div className={`relative w-[100%] bg-[#232F4B] border-[#5A6A93] min-h-[150px] border-[1px] rounded-[2px]  ${className}`}>

      <input
        type="file"
        onChange={handleFileInput}
        className="hidden"
        ref={fileInputRef}
        accept='image/*'
        readOnly={readOnly}
      />
    
      {imagePreview || value? (
        <div className="flex overflow-hidden absolute h-full w-[100%] rounded-[inherit]">
          <img
            src={(!value || value instanceof File)? imagePreview as string : value?.filePath}
            
            alt="Selected File"
            className="m-auto relative top-0 bottom-0 left-0 right-0 rounded-[inherit] w-full h-full"
          />
          {!readOnly && (
            <div className="absolute inset-0 flex gap-1 items-center justify-center z-50 bottom-0 right-2 top-auto left-auto h-[35px]">
              <span className="bg-[#232F4B] w-[25px] h-[25px] rounded-[25px] flex justify-center items-center cursor-pointer">
                  <PencilSimple onClick={handleFileInputClick} size='14' color='#ffffff'/>
              </span>
              <span className="bg-[#232F4B] w-[25px] h-[25px] rounded-[25px] flex justify-center items-center cursor-pointer">
            
                <Trash size='14' color='#ffffff' onClick={handleDelete}/>
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full cursor-pointer" onClick={handleFileInputClick}>
           {placeholder}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
