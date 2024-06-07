"use client";

import { useForm } from "react-hook-form";

import CustomSelect from "@/components/CustomSelect";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import FileUploader from "@/components/FileUploaderProfile";
import TextInput from "@/components/TextInput";
import SwitchButton from "@/components/SwitchButton";
import DownloadWrapper from "@/components/DownloadWrapper";
import { KYCOptions } from "./configs";

const KycStatus = () => {
  const {
    reset,
    // handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      KYCstatus: "",
      KYCverify: false,
    },
  });
  const useFormAccessor = watch();

  return (
    <form className="flex flex-col gap-4 col-start-1 md:col-end-4">
      <Accordion
        EditButton={
          <div
            className={`flex flex-row w-full justify-between items-center gap-3`}
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
        title="KYC Status"
        className="bg-white py-5 px-3"
        status="ACTIVE"
      >
        <div className="grid md:grid-cols-2 gap-2">
          <div>
            <label className="capitalize text-[12px] font-bold pl-2.5 mb-5">
              KYC Verification
            </label>
            <div className="flex items-center relative border border-transparent bg-[#F5F8FF80] px-2">
              <SwitchButton
                value={useFormAccessor.KYCverify}
                onChange={() =>
                  setValue("KYCverify", !useFormAccessor.KYCverify, {
                    shouldDirty: true,
                  })
                }
              />
              <p className="ml-2 text-[12px] tracking-wider font-[500]">
                Disabled
              </p>
            </div>
          </div>
          <CustomSelect
            className="py-2.5"
            label="KYC Status"
            options={KYCOptions}
            value={useFormAccessor.KYCstatus}
            onChange={(option) => {
              setValue("KYCstatus", option.value, { shouldDirty: true });
            }}
          />
        </div>
      </Accordion>
      <div className="mt-5 py-5 px-3 bg-white">
        <div className="grid md:grid-cols-1 gap-4 mb-2">
          <FileUploader label="Profile Picture" readOnly />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <TextInput value="John Doe" label="Full Legal Name" readOnly />
          <TextInput value="15/06/1998" label="Date of Birth" readOnly />
          <TextInput value="Passport" label="ID Document Type" readOnly />
          <TextInput value="L1234567" label="ID Document Number" readOnly />
          <div className="w-full">
            <DownloadWrapper
              value={""}
              secondaryLabel="ID Document Copy"
              readOnly
            />
          </div>
          <TextInput
            value="401, Building Name, Street"
            label="Address"
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export default KycStatus;
