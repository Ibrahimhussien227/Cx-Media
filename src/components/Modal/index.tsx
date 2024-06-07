"use client";

import { usePathname, useRouter } from "next/navigation";

import { IGeneralModalProps } from "./type";
import * as icons from "@/utils/icons";

const GeneralModal = ({
  className,
  icon,
  title,
  description,
  children,
  setShowModal,
  searchParams,
}: IGeneralModalProps) => {
  const DisplayIcon = icon && icons[icon.name as keyof typeof icons];

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleOnClick = () => {
    if (setShowModal) {
      setShowModal(false);
    } else {
      params.delete("modal");
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
        onClick={handleOnClick}
      />
      <div
        className={`inline-block bg-white rounded-sm px-4 py-5 text-left shadow-xl transform transition-all align-middle ${
          className ?? "w-[260px]"
        }`}
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
              <p className="text-[18px] font-MinionPro mt-1">{title}</p>
              <div className="h-[2px] w-6 my-2 bg-[#FF6C02]" />
            </div>
            <p className="text-[12px] text-secondary tracking-[0px]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-evenly items-center gap-4 mx-4 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
