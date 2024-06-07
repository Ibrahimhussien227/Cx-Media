import { useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import SwitchButton from "@/components/SwitchButton";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import Spinner from "@/components/Spinner";
import { CURRENCYOPTIONS } from "./configs";
import { IKYCFormProps } from "./type";

const KYCForm = ({ data }: IKYCFormProps) => {
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      KYCverify: data?.kycVerify,
      KYCstatus: data?.kycStatus,
    },
  });
  const formAccessor = watch();

  const onSubmit = async () => {
    // code...
  };

  const replaceWithIsLoadingForPatching = false;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="KYC Status"
        status="ACTIVE"
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!replaceWithIsLoadingForPatching ? (
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="capitalize text-[12px] font-bold pl-2??.5 mb-5">
                KYC Verification
              </label>
              <div className="flex items-center relative border border-transparent bg-[#F5F8FF80] px-2">
                <SwitchButton
                  value={formAccessor?.KYCverify}
                  onChange={() =>
                    setValue("KYCverify", !formAccessor?.KYCverify, {
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
              className="py-2??.5 pl-2"
              label="KYC Status"
              options={CURRENCYOPTIONS}
              value={formAccessor?.KYCstatus}
              onChange={(option) => {
                setValue("KYCstatus", option.value, { shouldDirty: true });
              }}
            />
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default KYCForm;
