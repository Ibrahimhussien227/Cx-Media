"use client";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import DownloadWrapper from "@/components/DownloadWrapper";
import { useForm } from "react-hook-form";
import { WEALTHOPTIONS } from "./configs";
import { ChangeEvent, useEffect } from "react";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { IField, IFormData, IWealthProps } from "./type";
import { useUpdateInvestorMutation } from "@/store/services/investors/investorDetailsApi";
import { calcDirtyFields } from "@/utils/getFormStatus";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const WealthForm = ({ data, investorId }: IWealthProps) => {
  const [updateInvestor, { isLoading }] = useUpdateInvestorMutation();
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      wealthSource: data?.sourceOfWealth,
      wealthSourceProof: data?.sourceOfWealthProof,
    },
  });
  const formAccessor = watch();
  const formStatus = calcDirtyFields(formAccessor);

  useEffect(() => {
    reset({
      wealthSource: data?.sourceOfWealth,
      wealthSourceProof: data?.sourceOfWealthProof,
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
        title="Source Of Wealth"
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
                className="pl-2 mb-2"
                label="Source Of Wealth"
                options={WEALTHOPTIONS}
                value={formAccessor.wealthSource}
                onChange={(option) => {
                  setValue("wealthSource", option.value, {
                    shouldDirty: true,
                  });
                }}
              />

              <DownloadWrapper
                value={
                  formAccessor.wealthSourceProof?.originalname ??
                  formAccessor.wealthSourceProof?.name
                }
                filePath={formAccessor.wealthSourceProof?.fileLink}
                secondaryLabel="Source of Wealth Proof"
                edit={formAccessor.wealthSourceProof}
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "wealthSourceProof")
                }
              />
            </div>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default WealthForm;
