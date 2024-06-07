import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import FormModal from "@/components/FormModal";
import TextInput from "@/components/TextInput";
import { ROLELEVELS } from "./configs";
import { ICreateModalProps, IInvitationSubmitForm } from "./type";
import { useCreateAdminMutation } from "@/store/services/admin/adminApi";

const CreateModal = ({
  setModalOpen,
  setIsSuccessModalOpen,
}: ICreateModalProps) => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      roleId: "",
    },
  });

  const [createAdmin, { isSuccess, error }] = useCreateAdminMutation();
  const handleSubmitInvetion: SubmitHandler<IInvitationSubmitForm> = async (
    formData,
  ) => {
    await createAdmin(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setModalOpen(false);
      setIsSuccessModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <FormModal
      setShowModal={setModalOpen}
      title="Add Administrator"
      className="w-[600px]"
    >
      {error && (
        <p className="text-red-500 text-center mb-4">
          {(error as { data: { error: string } }).data.error}
        </p>
      )}
      <form
        onSubmit={handleSubmit(handleSubmitInvetion)}
        className="w-full px-2 grid md:grid-cols-2 gap-4"
      >
        <div className="flex flex-col w-full">
          <TextInput
            {...register("fullName")}
            label="Full Name"
            placeholder="Enter"
          />
        </div>
        <div className="flex flex-col w-full">
          <TextInput {...register("email")} label="Email" placeholder="Enter" />
        </div>

        <div className="flex flex-col w- col-start-1 col-end-1">
          <CustomSelect
            label="Select Role"
            options={ROLELEVELS}
            value={watch("roleId")}
            onChange={(selectedRole) =>
              setValue("roleId", selectedRole.value, { shouldDirty: true })
            }
          />
        </div>
        <div />

        <div
          className={`col-span-2 col-start-2 col-end-3 flex flex-row justify-between ml-3 ${
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
            INVITE
          </CustomButton>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateModal;
