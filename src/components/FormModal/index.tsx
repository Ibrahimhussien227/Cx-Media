"use client";

import { IFormModalProps } from "./type";
import { usePathname, useRouter } from "next/navigation";

const FormModal = ({
  setShowModal,
  children,
  searchParams,
}: IFormModalProps) => {
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
      <div className="inline-block bg-white rounded-sm px-5 py-5 text-left shadow-xl transform transition-all align-middle w-[350px]">
        <div className="flex flex-col items-center tracking-[0px]">
          <div className="w-full text-[12px] text-secondary tracking-[0px] font-[500]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
