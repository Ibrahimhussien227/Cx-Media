"use client";

import { useForm } from "react-hook-form";

import CustomSelect from "@/components/CustomSelect";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";

import SwitchButton from "@/components/SwitchButton";

import { KYCOptions } from "./configs";
import { IKYCFormProps } from "./type";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import Spinner from "@/components/Spinner";
import KycProfile from "@/components/KycProfile";

const KycStatus = ({ data }: IKYCFormProps) => {
  const {
    reset,
    // handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      KYCstatus: data?.kycStatus,
      KYCverify: data?.kycVerify,
      IdDocument: "",
    },
  });
  const formAccessor = watch();

  const replaceWithIsLoadingPAtch = false;

  return (
    <form className="flex flex-col gap-4 col-start-1 md:col-end-4">
      <Accordion
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
        title="KYC Status"
        className="bg-white py-5 px-3"
        status={formAccessor.KYCstatus}
      >
        {!data ? (
          <GridFormSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <label className="capitalize text-[12px] font-bold pl-2.5 mb-5">
                KYC Verification
              </label>
              <div className="flex items-center relative border border-transparent bg-[#F5F8FF80] px-2">
                <SwitchButton
                  value={formAccessor.KYCverify}
                  onChange={() =>
                    setValue("KYCverify", !formAccessor.KYCverify, {
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
              placeholder="Select"
              className="py-[9px] px-2"
              label="KYC Status"
              options={KYCOptions}
              value={formAccessor.KYCstatus}
              onChange={(option) => {
                setValue("KYCstatus", option.value, { shouldDirty: true });
              }}
            />
          </div>
        )}
      </Accordion>
      {data && <KycProfile />}
    </form>
  );
};

export default KycStatus;
