import React from "react";

const TransactionTextType = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <div
        className={` w-[6px] h-[6px] rounded-full ${
          text === "Credit" ? "bg-green-600" : "bg-red-600"
        }`}
      />
      <p>{text}</p>
    </div>
  );
};

export default TransactionTextType;
