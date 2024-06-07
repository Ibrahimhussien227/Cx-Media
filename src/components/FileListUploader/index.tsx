"use client";
import Button from "../button";
import {Plus} from '@/utils/icons';
import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import FileUploader from "../FileUploader";
import { IFileListUploaderProps, namedFile } from "./type";
import { DebouncedInput } from "../TextInputs";


const FileListUploader =({
  showNameInput = true,
  addBTnText,
  fileUploaderProps,
  readOnly,
  namedFiles,
  onChange
}: IFileListUploaderProps)=> {

  const [filesList, setFilesList] = useState<namedFile[]>(namedFiles);
  const [changingInputIdx, setChangingInputIdx] = useState(0);

  const addOtherFileUploader =()=>{
    if(!readOnly && (filesList.length === 0 || Boolean(filesList.at(-1))) ) {
      setFilesList(prevState=> prevState.concat({name: '', file: null}))
    }
  }

  const handleListChange =({idx, name, file}: namedFile & {idx: number})=>{
    // save locally if new uploader with null, call parent OnChange if otherwise (optimization)
    setChangingInputIdx(idx);
    if (name && !file && filesList[idx].file === null){ //it's a change in name input of an empty uploader (no file yet)
      setFilesList(prevList=> prevList.map((obj, i)=> idx === i? {...obj, name}: obj))
    } else {
      let newFilesList : namedFile[] = [];
      if (file){
        newFilesList = filesList.concat([]);
        newFilesList[idx] = {file: file, name: name || filesList[idx].name}
      } else {  // file === null, removed file or cancelled uploading
        const originalpassedFile = namedFiles[idx];
        if (originalpassedFile === null && !name) return; // no change
        
        newFilesList = filesList.concat([]);
        newFilesList[idx] = {
          name: name || originalpassedFile.name, // reset to old value, update name if there is a change
          file: originalpassedFile.file !== filesList[idx].file? originalpassedFile.file : null
        }
      }
      setFilesList(newFilesList);
      onChange(newFilesList);
    }
  }
  

  return (
    <div className="flex flex-col gap-4">
      <Button
        color="#5A6A93"
        className="w-fit"
        onClick={addOtherFileUploader}
      >
        {addBTnText || "Add File" }
        <Plus size={14} color="#ffffff" className="ml-[4px]" />
      </Button>

      {filesList.map((fileObj, idx)=> (
        <div key={nanoid()}>
          {showNameInput && (
            <DebouncedInput
              onChange={(nameStr) => handleListChange({idx, file: fileObj.file, name: nameStr})}
              value={fileObj.name}
              className="w-full"
              autoFocus={changingInputIdx === idx} // solving a bug of losing focus upon state change, since the child component is unmounted and mounted again
            />
          )}
          <FileUploader
            value={fileObj.file}
            onFileChange={(file)=> handleListChange({idx, file: file || fileObj.file})}
            onRemove={()=> handleListChange({idx, file: null})}
            placeholder="upload file"
            readOnly={readOnly}
            className="w-full"
            {...fileUploaderProps || {}}
          />
        </div>
      ))}
    </div>
  );
}

export default FileListUploader;
