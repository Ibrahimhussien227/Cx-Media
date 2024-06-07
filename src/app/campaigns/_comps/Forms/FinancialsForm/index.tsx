"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import { getDirtyFields } from "@/utils/getDirtyFields";
import {
  useCreateAssetFinanceMutation,
  useUpdateAssetFinanceMutation,
} from "@/store/services/campaigns/assetDetailsApi";
import { IFinancialsFormProps, IFinancialsSubmitForm } from "./type";

import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const FinancialsForm = ({
  propertyFinancials,
  campaignId,
  assetId,
}: IFinancialsFormProps) => {
  const [updateFinance, { isLoading }] = useUpdateAssetFinanceMutation();
  const [createAssetFinance] = useCreateAssetFinanceMutation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      propertyPrice: propertyFinancials?.propertyPrice,
      projectedAnnualizedReturn: propertyFinancials?.projectedAnnualizedReturn,
      projectedAnnualAppreciation:
        propertyFinancials?.projectedAnnualAppreciation,
      projectedGrossYield: propertyFinancials?.projectedGrossYield,
      projectedNetYield: propertyFinancials?.projectedNetYield,
    },
  });

  const handleSubmitComapny: SubmitHandler<IFinancialsSubmitForm> = async (
    formData
  ) => {
    if (propertyFinancials) {
      await updateFinance({
        campaignId,
        body: getDirtyFields(formData, dirtyFields),
        financialId: propertyFinancials.financialId,
      });
    } else {
      await createAssetFinance({
        campaignId,
        body: Object.assign(getDirtyFields(formData, dirtyFields), {
          assetId: assetId,
        }),
      });
    }
  };

  useEffect(() => {
    reset({
      propertyPrice: propertyFinancials?.propertyPrice,
      projectedAnnualizedReturn: propertyFinancials?.projectedAnnualizedReturn,
      projectedAnnualAppreciation:
        propertyFinancials?.projectedAnnualAppreciation,
      projectedGrossYield: propertyFinancials?.projectedGrossYield,
      projectedNetYield: propertyFinancials?.projectedNetYield,
    });
  }, [propertyFinancials, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Financials"
        status={propertyFinancials?.completionStatus}
        EditButton={
          <div
            className={`${
              !isDirty && "opacity-50"
            } flex flex-row w-full justify-between items-center gap-3`}
          >
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
          </div>
        }
      >
        {isLoading ? (
          <GridFormSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              {...register("propertyPrice", {
                setValueAs: (v) => parseInt(v),
              })}
              label="Property Valuation (AED)"
            />
            <TextInput
              {...register("projectedAnnualizedReturn", {
                setValueAs: (v) => parseInt(v),
              })}
              label="Projected Annualized Return (%)"
            />
            <TextInput
              {...register("projectedAnnualAppreciation", {
                setValueAs: (v) => parseInt(v),
              })}
              label="Projected Annual Appreceation (%)"
            />
            <TextInput
              {...register("projectedGrossYield", {
                setValueAs: (v) => parseInt(v),
              })}
              label="Projected Gross Yield (%)"
            />
            <TextInput
              {...register("projectedNetYield", {
                setValueAs: (v) => parseInt(v),
              })}
              label="Projected Net Yield (%)"
            />
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default FinancialsForm;
