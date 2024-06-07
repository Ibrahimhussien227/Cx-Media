/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// import { useState } from "react";

import CustomSelect from "@/components/CustomSelect";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import { CURRENCYOPTIONS, LANGSOPTION } from "./configs";
import { useForm } from "react-hook-form";
import SwitchButton from "@/components/SwitchButton";
// import { data } from "../../configs";

const AccountSettings = () => {
  const {
    reset,
    // handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      language: "",
      currency: "",
      TwoFA: false,
    },
  });
  const useFormAccessor = watch();

  // const [accountCurrency, setAccountCurrency] = useState(
  //   data.preferences?.currency || currencyOptions[0].value
  // );
  // const [accountLang, setAccountLang] = useState(
  //   data.preferences?.lang || langsOptions[0].value
  // );

  // const hasDetailChanged =
  //   accountCurrency !== data.preferences?.currency ||
  //   accountLang !== data.preferences?.lang;

  // const resetForm = () => {
  //   setAccountCurrency(data.preferences?.currency || currencyOptions[0].value);
  //   setAccountLang(data.preferences?.lang || langsOptions[0].value);
  // };
  return (
    <form className="flex flex-col gap-4 col-start-1 md:col-end-4">
      <Accordion
        title="Account Settings"
        className="bg-white py-5 px-3"
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
              onClick={() => reset()}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              disabled={!isDirty}
              className={`bg-primary text-[white] px-3 py-1 font-[300] rounded-none animate-fade ${
                isDirty ? "hover:bg-[#F5F8FF] opacity-100" : "opacity-50"
              }`}
            >
              Update
            </CustomButton>
          </div>
        }
      >
        <div className="grid md:grid-cols-2 gap-2">
          <CustomSelect
            label="Prefered Language"
            options={LANGSOPTION}
            value={useFormAccessor.language}
            onChange={(option) => {
              setValue("language", option.value, { shouldDirty: true });
            }}
          />
          <CustomSelect
            label="Prefered Currency"
            options={CURRENCYOPTIONS}
            value={useFormAccessor.currency}
            onChange={(option) => {
              setValue("currency", option.value, { shouldDirty: true });
            }}
          />
          <div>
            <label className="capitalize text-[12px] font-bold pl-2.5 mb-5">
              2 Factor Authentication
            </label>
            <div className="flex items-center relative border border-transparent bg-[#F5F8FF80] px-2">
              <SwitchButton
                value={useFormAccessor.TwoFA}
                onChange={() =>
                  setValue("TwoFA", !useFormAccessor.TwoFA, {
                    shouldDirty: true,
                  })
                }
              />
              <p className="ml-2 text-[12px] tracking-wider font-[500]">
                Disabled
              </p>
            </div>
          </div>
        </div>
      </Accordion>
    </form>
  );
};

export default AccountSettings;
