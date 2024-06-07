"use client";

import { IGeneralModalProps } from "./type";

const FormModal = ({
  setShowModal,
  title,
  children,
  className,
}: IGeneralModalProps) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
        onClick={() => setShowModal(false)}
      />
      <div
        className={`inline-block bg-white rounded-sm px-5 py-5 text-left shadow-xl transform transition-all align-middle ${
          className ?? "w-[390px]"
        }`}
      >
        <div className="flex flex-col items-center tracking-[0px]">
          <div className="w-full border-b pb-3 mb-3">
            <p className="text-[18px] font-minion mt-1 font-[500]">{title}</p>
          </div>
          <div className="w-full my-2 text-[12px] text-secondary tracking-[0px] font-[500]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
