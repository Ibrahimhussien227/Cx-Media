import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
// import Spinner from "@/components/Spinner";
import SwitchButton from "@/components/SwitchButton";
import { ITransactionSubmitForm } from "./type";

const TransactionSettingsForm = () => {
  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      deposit: false,
      withdrawals: false,
      registrationFee: false,
      campaignListingFee: false,
    },
  });

  const useFormAccessor = watch();

  // submit handler
  const handleSubmitComapny: SubmitHandler<ITransactionSubmitForm> = async (
    formData
  ) => {
    console.log(formData);
  };

  const handleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "deposit" | "withdrawals" | "registrationFee" | "campaignListingFee"
  ) => {
    setValue(key, e.target.checked, { shouldDirty: true });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5 rounded-sm"
    >
      <Accordion
        title="Manage Transaction Settings"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            <>
              <CustomButton
                className={`p-2 ml-auto font-medium px-3 py-1 rounded-none animate-fade border ${
                  isDirty && "hover:bg-[#F5F8FF]"
                }`}
                onClick={() => reset()}
                disabled={!isDirty}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                className="bg-primary text-white px-3 py-1 font-medium rounded-none animate-fade"
                disabled={!isDirty}
              >
                Update
              </CustomButton>
            </>
          </div>
        }
      >
        <div className="divide-y flex flex-col">
          <SwitchButton
            // isDisabled={isLoading}
            value={useFormAccessor.deposit}
            onChange={(e) => handleSwitchChange(e, "deposit")}
          >
            <div>
              <p className="font-bold text-[14px]">Deposit</p>
              <p className="text-[14px] text-gray-500">
                Enable/Disable deposits on platform.
              </p>
            </div>
          </SwitchButton>
          <SwitchButton
            // isDisabled={isLoading}
            value={useFormAccessor.withdrawals}
            onChange={(e) => handleSwitchChange(e, "withdrawals")}
          >
            <div>
              <p className="font-bold text-[14px]">Withdrawals</p>
              <p className="text-[14px] text-gray-500">
                Enable/Disable withdrawals fee on platform.
              </p>
            </div>
          </SwitchButton>{" "}
          <SwitchButton
            // isDisabled={isLoading}
            value={useFormAccessor.registrationFee}
            onChange={(e) => handleSwitchChange(e, "registrationFee")}
          >
            <div>
              <p className="font-bold text-[14px]">Registration Fee</p>
              <p className="text-[14px] text-gray-500">
                Enable/Disable registration fee on platform.
              </p>
            </div>
          </SwitchButton>{" "}
          <SwitchButton
            // isDisabled={isLoading}
            value={useFormAccessor.campaignListingFee}
            onChange={(e) => handleSwitchChange(e, "campaignListingFee")}
          >
            <div>
              <p className="font-bold text-[14px]">Campaign Listing Fee</p>
              <p className="text-[14px] text-gray-500">
                Enable/Disable campaign listing fee on platform.
              </p>
            </div>
          </SwitchButton>
        </div>
      </Accordion>
    </form>
  );
};

export default TransactionSettingsForm;
