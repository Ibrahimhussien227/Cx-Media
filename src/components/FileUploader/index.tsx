import React, { ChangeEvent, useRef, useState } from "react";

import  { UploadSimple, X }  from "../../utils/icons";
import Button from "@/components/button";


const FileUploader = ({
  onFileChange,
  label,
  placeholder,
  value,
  onRemove,
  note,
  accept,
  className,
  readOnly
}: IFileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (readOnly){
      return;
    }
    if (file) {
      setSelectedFile(file);

      // Read the content of the file as a data URL for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }

    // Pass the selected file to the parent component
    onFileChange(file);
  };
  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current){
      fileInputRef.current.value = ''
    }
    onRemove && onRemove()
  };
  return (
    <div className={`grid sm:grid-cols-[0.5fr_1fr_1fr] grid-cols-[0.5fr_1fr] gap-5 justify-center  w-[100%] ${className}`}>
      {label ? (
        <label className=" font-bold text-[10px] text-[#93A0C3] flex tracking-[1.5px] mb-0 mr-[12px]">
          {label}
        </label>
      ) : null}
      {/* ... (rest of your code) */}
      <div className={`flex w-[100%] gap-2 items-center ${!label && !note? 'col-span-3': ''}`}>
        <div className="flex w-[100%] relative">
          <input
            type="text"
            value={(selectedFile instanceof File ? selectedFile.name : selectedFile?.fileName) || ''}
            readOnly={true}
            placeholder={placeholder}
            className="bg-[#232F4B] text-[#ffffff] px-2.5 flex outline-none border border-gray-300 placeholder-[#93A0C3] focus:bg-[#232F4B] focus:border-[#5A6A93] h-[35px] text-[12px] rounded-[2px] w-[90%]"
          />
          {selectedFile ? (
            <Button
              color='transparent'
              onClick={handleRemove}
              className="!p-0 m-0 absolute right-[5px] top-0 bottom-0"
            >
              <X size={15} color="#ffffff"  weight="bold"/>
            </Button>
          ) : null}
        </div>
      
        <input
          type="file"
          onChange={handleFileInput}
          className="hidden"
          ref={fileInputRef}
          accept={accept}
        />
        <span
          className="w-[25px] h-[25px] border rounded-[50%] cursor-pointer grid place-items-center"
          onClick={()=> !readOnly && fileInputRef.current?.click()}
        >
          <UploadSimple size={15} color="#ffffff" />
        </span>
      </div>
      {note && (
        <span className="text-[#93A0C3] text-[12px] tracking-[0px] sm:flex hidden shrink-none pl-[20px] border-l-[1px]">
          {note}
        </span>
        )}
    </div>
  );
};

export default FileUploader;
