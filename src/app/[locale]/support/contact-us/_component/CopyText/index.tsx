"use client";
import React, { useState } from "react";

const CopyText = ({
  title,
  initialText,
}: {
  title: string;
  initialText: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(initialText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => console.error("Unable to copy text", err));
  };
  return (
    <div className="flex w-[400px] justify-between  px-[20px] py-[10px] rounded-[2px] mb-[10px] cursor-pointer bg-gradient border-[#fffaf800]">
      <div className="flex flex-col justify-center">
        <h3 className="text-secondary text-[10px] font-bold tracking-[1.5px]">
          {title}
        </h3>
        <p className=" text-[16px] tracking-[0px] font-MinionPro">
          {initialText}
        </p>
      </div>
      <button
        onClick={handleCopyText}
        className="flex border-[#D4E4F2] border-[1px] h-[31px] px-[10px] justify-center items-center bg-white rounded-[2px]"
      >
        {isCopied ? (
          <div className="flex justify-center items-center text-secondary text-[10px] font-bold tracking-[1.5px]">
            <svg
              id="check"
              xmlns="http://www.w3.org/2000/svg"
              width="8.125"
              height="6"
              viewBox="0 0 8.125 6"
              className="mr-[5px]"
            >
              <path
                id="Path_39"
                data-name="Path 39"
                d="M1968.114,53.031l-2.722-2.718a.54.54,0,0,1,.763-.764l1.959,1.956,4.323-4.316a.54.54,0,1,1,.763.764Z"
                transform="translate(-1965.234 -47.031)"
                fill="#12ef90"
              />
            </svg>
            COPIED
          </div>
        ) : (
          <div className="flex justify-center items-center text-secondary text-[10px] font-bold tracking-[1.5px] bg-white rounded-[2px]">
            <svg
              id="copy"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className="mr-[5px]"
            >
              <path
                id="Path_99"
                data-name="Path 99"
                d="M14.239,12.9h3.982a1.341,1.341,0,0,1,1.339,1.339v3.982a1.341,1.341,0,0,1-1.339,1.339H14.239A1.341,1.341,0,0,1,12.9,18.221V14.239A1.341,1.341,0,0,1,14.239,12.9Zm3.982,5.751a.431.431,0,0,0,.43-.43V14.239a.431.431,0,0,0-.43-.43H14.239a.431.431,0,0,0-.43.43v3.982a.431.431,0,0,0,.43.43Z"
                transform="translate(-9.56 -9.56)"
                fill="#2c3a5c"
              />
              <path
                id="Path_100"
                data-name="Path 100"
                d="M4.182,9.061H3.739A1.341,1.341,0,0,1,2.4,7.721V3.739A1.339,1.339,0,0,1,3.739,2.4H7.721A1.341,1.341,0,0,1,9.061,3.739v.442a.455.455,0,1,1-.909,0V3.739a.431.431,0,0,0-.43-.43H3.739a.43.43,0,0,0-.43.43V7.721a.431.431,0,0,0,.43.43h.442a.455.455,0,1,1,0,.909Z"
                transform="translate(-2.4 -2.4)"
                fill="#2c3a5c"
              />
            </svg>
            COPY
          </div>
        )}
      </button>
    </div>
  );
};

export default CopyText;
