import React from "react";

import CustomButton from "@/components/CustomButton";
import Modal from "@/components/Modal";
import { IDeleteModalProps } from "./type";

const DeleteModals = ({ setShowModal, handlerSubmit }: IDeleteModalProps) => {
  return (
    <Modal
      icon={{
        name: "Trash",
        props: {
          size: 45,
          className: "bg-red-500 rounded-full text-white py-3 px-3",
        },
      }}
      title="Delete"
      description="Are you sure you want delete the selceted item?"
      setShowModal={setShowModal}
    >
      <CustomButton
        className="hover:bg-[#D4E4F2] transition-all delay-100 w-full py-2 bg-[#D4E4F2] text-secondary text-[12px] tracking-[1.5px] font-medium"
        onClick={() => {
          setShowModal(false);
        }}
      >
        CANCEL
      </CustomButton>
      <CustomButton
        type="submit"
        onClick={handlerSubmit}
        className="transition-all delay-100 w-full py-2 bg-red-500 text-[white] text-[12px] tracking-[1.5px] font-medium"
      >
        Proceed
      </CustomButton>
    </Modal>
  );
};

export default DeleteModals;
