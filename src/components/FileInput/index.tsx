import React, { useState } from "react";
import DownloadButton from "../DownloadButton";
import { TextInput } from "../TextInputs";
import Button from "../button";
import { IFileInputProps } from "./type";
import {Eye} from '@/utils/icons'

const FileInput =({fileName, fileUrl, onClick}: IFileInputProps)=> {

  return (
    <div className="flex gap-2 items-center">
      <TextInput
        readOnly={true}
        value={fileName}
      />
      <Button color="#5A6A93" className="p-1 h-7 w-7 !rounded-[50%]" onClick={onClick}   >
        <Eye  size={18} className="shrink-0"/>
      </Button>
      {/* <DownloadButton  srcUrl={fileUrl} className="p-1 h-7 w-7 !rounded-[50%]" /> */}
     
    </div>
  );
}


export default FileInput;