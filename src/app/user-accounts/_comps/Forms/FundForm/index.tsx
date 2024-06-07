import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import { useForm } from "react-hook-form";
import DownloadWrapper from "@/components/DownloadWrapper";
import { SOURCEOPTIONS } from "./configs";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { ChangeEvent, useEffect } from "react";
import { IField, IFormData, IFundProps } from "./type";
import { useUpdateInvestorMutation } from "@/store/services/investors/investorDetailsApi";
import { calcDirtyFields } from "@/utils/getFormStatus";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const FundForm = ({ data, investorId }: IFundProps) => {
  const [updateInvestor, { isLoading }] = useUpdateInvestorMutation();
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      sourceOfFunds: data?.sourceOfFunds,
      sourceOfFundsProof: data?.sourceOfFundsProof,
    },
  });
  const formAccessor = watch();
  const formStatus = calcDirtyFields(formAccessor);

  useEffect(() => {
    reset({
      sourceOfFunds: data?.sourceOfFunds,
      sourceOfFundsProof: data?.sourceOfFundsProof,
    });
  }, [data, reset]);

  const changeHandler = (e: ChangeEvent<Element>, field: IField) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setValue(field, target.files[0], {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: IFormData) => {
    const dirtyItems = getDirtyFields(data, dirtyFields);
    const form = new FormData();

    form.append("investorId", investorId);
    Object.keys(dirtyItems).forEach((key) => {
      const value = dirtyItems[key as keyof typeof dirtyItems];
      if (value !== undefined) {
        form.append(key, value as string);
      }
    });

    updateInvestor({ body: form });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Source Of Funds"
        status={formStatus ? (formStatus == 2 ? "COMPLETE" : "INCOMPLETE") : ""}
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
            {!isLoading ? (
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
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <CustomSelect
                className=" mb-2"
                label="Source Of Funds"
                options={SOURCEOPTIONS}
                value={formAccessor.sourceOfFunds}
                onChange={(option) => {
                  setValue("sourceOfFunds", option.value, {
                    shouldDirty: true,
                  });
                }}
              />
              <DownloadWrapper
                value={
                  formAccessor.sourceOfFundsProof?.originalname ??
                  formAccessor.sourceOfFundsProof?.name
                }
                filePath={formAccessor.sourceOfFundsProof}
                secondaryLabel="Source of Funds Proof"
                edit={formAccessor.sourceOfFundsProof}
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "sourceOfFundsProof")
                }
              />
            </div>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default FundForm;
