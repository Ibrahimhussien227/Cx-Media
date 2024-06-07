"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import PhoneInput from "@/components/PhoneInput";
import { IidentityProps } from "./type";
import Warning from "@/components/Warning";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { calcDirtyFields } from "@/utils/getFormStatus";

const IdentityForm = ({ data }: IidentityProps) => {
  const [countryCode, setCountryCode] = useState<string>(data?.countryCode);
  const {
    control,
    reset,
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      fullName: data?.name,
      email: data?.email,
      phoneInput: data?.phoneNumber,
    },
  });
  const formAccessor = watch();
  const formStatus = calcDirtyFields(formAccessor);

  useEffect(() => {
    reset({
      fullName: data?.name,
      email: data?.email,
      phoneInput: data?.phoneNumber,
    });
  }, [data, reset]);

  const onSubmit = async () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Identity & Contact"
        status={formStatus ? (formStatus == 3 ? "COMPLETE" : "INCOMPLETE") : ""}
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            <CustomButton
              className="p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border hover:bg-[#F5F8FF]"
              onClick={() => reset()}
              disabled={!isDirty}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              className="bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade"
              disabled={!isDirty}
            >
              Update
            </CustomButton>
          </div>
        }
      >
        {!data ? (
          <GridFormSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput {...register("fullName")} label="Full Name" readOnly />
              <TextInput
                {...register("email")}
                label="Email Address"
                readOnly
              />
              <Controller
                name="phoneInput"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    countryCode={countryCode}
                    onChangeCountryCode={setCountryCode}
                    placeholder="Enter your phone number."
                    label="Phone Number"
                    isReadOnly
                  />
                )}
              />
            </div>
            <Warning
              className="text-[#BF8C00] font-medium"
              description="The name, email and phone number associated with the seller’s profile is linked to the user’s primary account. In order to make changes to this information, you need to update the user’s primary account."
            />
          </>
        )}
      </Accordion>
    </form>
  );
};

export default IdentityForm;
