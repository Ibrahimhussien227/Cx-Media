import React from "react";

import CustomButton from "@/components/CustomButton";
import Modal from "@/components/Modal";
import { ISuccessModalProps } from "./type";

const SuccessModal = ({
  setModalOpen,
  title,
  description,
  handleClick,
}: ISuccessModalProps) => {
  return (
    <Modal
      icon={{
        name: "Check",
        props: {
          size: 45,
          className: "bg-[#00CB9C] rounded-full text-white py-3 px-3",
        },
      }}
      title={title ?? "Success"}
      description={description}
      setShowModal={setModalOpen}
    >
      <CustomButton
        className="transition-all delay-100 px-10 py-2 bg-[#2C3A5C] text-white text-[12px] tracking-[1.5px] font-medium rounded-sm"
        onClick={() => {
          handleClick && handleClick();
          setModalOpen(false);
        }}
      >
        DONE
      </CustomButton>
    </Modal>
  );
};

export default SuccessModal;
