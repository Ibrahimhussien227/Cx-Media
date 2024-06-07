import React from "react";
import CustomButton from "@/components/CustomButton";
// import CustomSelect from "@/components/CustomSelect";
import FormModal from "@/components/FormModal";
import GenralTextArea from "@/components/GenralTextArea";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { ICreateModalProps } from "./type";

const CreateModal = ({
  setShowModal,
  titlesCreateModal,
  handlerSubmit,
}: ICreateModalProps) => {
  const {
    // watch,
    // setValue,
    reset,
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // useEffect(() => {
  //   reset({
  //     publishDate: publishedAt?.split(" ")[0],
  //   });
  // }, [reset, publishedAt]);

  return (
    <FormModal
      setShowModal={setShowModal}
      title={titlesCreateModal.title}
      className="w-[600px]"
    >
      <form
        onSubmit={handleSubmit(handlerSubmit)}
        className="w-full px-2 flex flex-col gap-4"
      >
        <TextInput
          {...register("title")}
          label={titlesCreateModal.inputLabel}
          placeholder={titlesCreateModal.inputPlaceHolder}
        />
        <GenralTextArea
          {...register("description")}
          label={titlesCreateModal.textAreaLabel}
          placeholder={titlesCreateModal.textAreaPlaceHolder}
        />

        {/* <CustomSelect
        label="Select Role"
        options={ROLELEVELS}
        value={watch("role")}
        onChange={(selectedRole) =>
          setValue("role", selectedRole.value, { shouldDirty: true })
        }
      /> */}

        <div className="flex flex-row justify-end items-center gap-4 ">
          <CustomButton
            onClick={() => {
              setShowModal(false);
              reset();
            }}
            className="font-medium text-[14px] text-primary px-6 py-1 rounded-sm animate-fade border tracking-[1.5px] hover:bg-[#F5F8FF]"
          >
            CANCEL
          </CustomButton>
          <CustomButton
            type="submit"
            className={`${
              !isDirty && "opacity-50"
            } bg-primary text-white text-[14px] px-6 py-1 font-medium rounded-sm animate-fade tracking-[1.5px]`}
            disabled={!isDirty}
          >
            SUBMIT
          </CustomButton>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateModal;
