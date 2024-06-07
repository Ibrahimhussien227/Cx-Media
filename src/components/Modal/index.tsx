"use client";

import { IGeneralModalProps } from "./type";
import * as icons from "@/utils/icons";

const GeneralModal = ({
  className,
  icon,
  setShowModal,
  title,
  description,
  children,
}: IGeneralModalProps) => {
  const DisplayIcon = icon && icons[icon.name as keyof typeof icons];

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
        onClick={() => setShowModal(false)}
      />
      <div
        className={`inline-block bg-white rounded-sm px-4 py-5 text-left shadow-xl transform transition-all align-middle w-[260px] ${className}`}
      >
        <div className="flex items-center tracking-[0px]">
          <div className="w-full flex flex-col items-center justify-center text-center">
            <div className="w-full flex flex-col justify-center items-center">
              {DisplayIcon && (
                <DisplayIcon
                  size={icon.props?.size || 15}
                  {...(icon.props ? icon.props : {})}
                />
              )}
              <p className="text-[14px] font-minion mt-3 font-bold">{title}</p>
            </div>
            <p className="my-2 text-[12px] text-secondary tracking-[0px] font-[500]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-evenly items-center gap-4 mx-4 mt-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
