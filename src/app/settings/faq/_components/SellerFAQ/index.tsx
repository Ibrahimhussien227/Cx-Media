import React, { useState } from "react";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import CreateModal from "@/app/settings/_components/Modals/CreateModal";
import DeleteModals from "@/app/settings/_components/Modals/DeleteModal";
import { PencilSimple, Plus, X } from "@/utils/icons";
import { TITLESCREATEMODAL } from "../configs";
import SuccessModal from "@/components/Modal/SuccessModal";

const SellerFAQ = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <div className="col-start-1 md:col-end-4 bg-white p-5 rounded-sm">
      {showModal && (
        <CreateModal
          handlerSubmit={() => {}}
          titlesCreateModal={TITLESCREATEMODAL}
          setShowModal={setShowModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModals
          handlerSubmit={() => {}}
          setShowModal={setShowDeleteModal}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          description="FAQ created successfully."
          setModalOpen={setShowSuccessModal}
        />
      )}

      <Accordion
        title="Platform Deposit"
        EditButton={
          <div className="flex flex-row w-full justify-end items-center gap-3">
            <CustomButton
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-3 py-1 font-medium rounded-sm animate-fade flex items-center justify-center gap-2 text-[14px]"
            >
              <Plus />
              ADD NEW
            </CustomButton>
          </div>
        }
      >
        <div className="grid md:grid-cols-1 gap-4 items-center">
          <div className="col-start-1 col-end-3">
            <TextInput
              className="w-full flex flex-row"
              label="Processing Fee (%)"
              // disabled={isLoading}
            />
          </div>
          <div className="flex flex-row w-fit col-start-3 col-end-4 mt-4">
            <X
              onClick={() => setShowDeleteModal(true)}
              className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer"
            />
            <PencilSimple className="ml-[7px] border w-[28px] h-[28px] rounded-[14px] p-[5px] cursor-pointer" />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default SellerFAQ;
