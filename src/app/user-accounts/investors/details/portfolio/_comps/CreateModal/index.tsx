import React, { SetStateAction } from "react";

import CustomButton from "@/components/CustomButton";
import FormModal from "@/components/FormModal";
import TextInput from "@/components/TextInput";

const CreateModal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <FormModal
      setShowModal={setShowModal}
      title="Create New Deposit"
      className="w-[400px]"
    >
      <form
        // onSubmit={handleSubmit(handleSubmitInvetion)}
        className="flex flex-col w-full px-2 gap-4"
      >
        <div className="flex flex-col w-full">
          <TextInput
            // {...register("fullName")}
            label="Amount"
            placeholder="Enter"
          />
        </div>
        <div className="flex flex-col w-full">
          <TextInput
            // {...register("email")}
            label="Email"
            placeholder="Enter"
          />
        </div>
        <div
          className={`col-span-2 col-start-2 col-end-3 gap-3 flex flex-row justify-end ${
            false && "opacity-50"
          }`}
        >
          <CustomButton
            onClick={() => {
              setShowModal(false);
              // reset();
            }}
            className="font-medium text-[14px] text-primary px-6 py-1 rounded-sm animate-fade border tracking-[1.5px] hover:bg-[#F5F8FF]"
          >
            CANCEL
          </CustomButton>
          <CustomButton
            type="submit"
            className={` bg-primary text-white text-[14px] px-6 py-1 font-medium rounded-sm animate-fade tracking-[1.5px]`}
            // disabled={!isDirty}
          >
            SUBMIT
          </CustomButton>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateModal;
