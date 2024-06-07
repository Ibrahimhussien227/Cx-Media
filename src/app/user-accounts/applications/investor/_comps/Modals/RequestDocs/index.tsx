import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import FormModal from "@/components/FormModal";
import TextInput from "@/components/TextInput";
import { ICreateModalProps, IInvitationSubmitForm } from "./type";
import { useSearchParams } from "next/navigation";
import { usePatchInvAppStatusMutation } from "@/store/services/investors/applicationsApi/applicationActions";

const RequestDocModal = ({
  setModalOpen,
  setIsSuccessModalOpen,
  selectedAction,
}: ICreateModalProps) => {
  const searchParams = useSearchParams();
  const [postAction] = usePatchInvAppStatusMutation();

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });
  const formAccessor = watch();

  const onSubmit: SubmitHandler<IInvitationSubmitForm> = async () => {
    const status = selectedAction == "REQUEST" ? "ACTION_REQUIRED" : "REJECTED";
    postAction({
      userId: searchParams.get("id")!,
      applicationStatus: status,
      profileRejectionReason: formAccessor.reason.toString(),
    });

    setModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <FormModal
      setShowModal={setModalOpen}
      title="Request Document"
      className="w-[350px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-2 grid md:grid-cols-2 gap-4"
      >
        <div className=" col-span-2 w-full">
          <TextInput
            {...register("reason")}
            label="Addition Documents Required"
            placeholder="Enter"
          />
        </div>
        <div />
        <div
          className={`col-span-2 gap-4 flex flex-row justify-end  ${
            !isDirty && "opacity-50"
          }`}
        >
          <CustomButton
            onClick={() => {
              setModalOpen(false);
              reset();
            }}
            className="font-medium text-[14px] text-primary px-6 py-1 rounded-sm animate-fade border tracking-[1.5px] hover:bg-[#F5F8FF]"
          >
            CANCEL
          </CustomButton>
          <CustomButton
            type="submit"
            className={` bg-primary text-white text-[14px] px-6 py-1 font-medium rounded-sm animate-fade tracking-[1.5px]`}
            disabled={!isDirty}
          >
            SUBMIT
          </CustomButton>
        </div>
      </form>
    </FormModal>
  );
};

export default RequestDocModal;
