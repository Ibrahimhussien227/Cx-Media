import React from "react";
import {IModalProps} from "./types";

const GeneralModal = ({ isOpen, onClose, children, className}: IModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={onClose}
          ></div>
          <div className={`z-10 w-[290px] rounded-[2px] bg-[#232F4B] p-[20px] relative ${className}`}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralModal;
