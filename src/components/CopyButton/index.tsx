"use client";

import { useState } from "react";
import Button from "../button";
import { ICopyButtonProps } from "./type";
import { Check, Copy } from '@/utils/icons'

const CopyButton =({
  text,
  ...props
}:ICopyButtonProps)=> {
  
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => console.error("Unable to copy text", err));
  };

  return (
    <Button
      {...props}
      onClick={handleCopyText}
    >
      {isCopied? (
        <Check size={18} color="#12ef90"/>
      ):(
        <Copy size={18} />
      )}
      {isCopied? 'Copied':'COPY'}
    </Button>
  )
}

export default CopyButton;
