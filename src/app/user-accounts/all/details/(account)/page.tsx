"use client";

// import { useState } from "react";

import TextInput from "@/components/TextInput";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "@/components/PhoneInput";
import { useSearchParams } from "next/navigation";
// import { data } from "../../configs";

const AccountDetails = () => {
  const searchParams = useSearchParams();
  const {
    control,
    reset,
    register,
    // handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneInput: "",
      countryCode: "",
    },
  });
  // const [accountRole, setAccountRole] = useState(data.level);
  // const [accountName, setAccountName] = useState(data.fullName);
  // const [accountEmail, setAccountEmail] = useState(data.email);

  // const hasDetailChanged =
  //   accountRole !== data.level ||
  //   accountName !== data.fullName ||
  //   accountEmail !== data.email;

  // const resetForm = () => {
  //   setAccountRole(data.level);
  //   setAccountName(data.fullName);
  //   setAccountEmail(data.email);
  // };
  const { countryCode } = watch();

  return (
    <form className="flex flex-col gap-4 col-start-1 md:col-end-4">
      <Accordion
        title="Account ID"
        status="ACTIVE"
        userId={searchParams.get("id")!}
        className="bg-white py-5 px-2"
        EditButton={
          <div
            className={`${
              false && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            <CustomButton
              disabled={!isDirty}
              className={`p-2 ml-auto font-[300] px-3 py-1 rounded-none animate-fade border ${
                isDirty ? "hover:bg-[#F5F8FF] opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                reset();
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              disabled={!isDirty}
              type="submit"
              className={`bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade ${
                isDirty ? "hover:bg-[#F5F8FF] opacity-100" : "opacity-50"
              }`}
            >
              Update
            </CustomButton>
          </div>
        }
      >
        {/* <div className="grid md:grid-cols-2 gap-2">
          <TextInput
            label="full legal name"
            // value={accountName}
            // onChange={(evt) => setAccountName(evt.target.value)}
          />
          <TextInput
            label="Email Address"
            // value={accountEmail}
            // onChange={(evt) => setAccountEmail(evt.target.value)}
          />
        </div> */}
        <div className="grid md:grid-cols-2 gap-4 p-1">
          <TextInput {...register("fullName")} label="Full Legal Name" />
          <TextInput {...register("email")} label="Email Address" />
          <Controller
            name="phoneInput"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                countryCode={countryCode}
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
      </Accordion>
    </form>
  );
};

export default AccountDetails;
