"use client";

import { Controller, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import PhoneInput from "@/components/PhoneInput";

import { accountDetailsData } from "./config";
import Warning from "../../../../../../components/Warning";
import { IIdentityFormProps } from "./type";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const IdentityForm = ({ data }: IIdentityFormProps) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      fullName: data?.name,
      email: data?.email,
      phoneInput: data?.phoneNumber,
      countryCode: accountDetailsData.phone.countryCode,
    },
  });

  const formAccessor = watch();

  const replaceWithIsLoadingPAtch = false;

  const handleSubmitComapny = async () => {};
  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Identity & Contact"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!replaceWithIsLoadingPAtch ? (
              <>
                <CustomButton
                  className={`p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border ${
                    isDirty && "hover:bg-[#F5F8FF]"
                  }`}
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
              </>
            ) : (
              <Spinner />
            )}
          </div>
        }
      >
        {!data ? (
          <GridFormSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-2">
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
                    isReadOnly
                    value={value}
                    onChange={onChange}
                    countryCode={formAccessor.countryCode}
                    onChangeCountryCode={(value: string) =>
                      setValue("countryCode", value, {
                        shouldDirty: true,
                      })
                    }
                    placeholder="Enter your phone number."
                    label="Phone Number"
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
