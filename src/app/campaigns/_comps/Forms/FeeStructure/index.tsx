"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";
import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";

import { ICampaignFeeFormProps, KEYSFORFORM } from "./type";

import { nanoid } from "nanoid";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { PLATFORMFEEFILDSNAME, PROPERTYFEEFILDSNAME } from "./configs";
import Spinner from "@/components/Spinner";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { useUpdateFeeStructureMutation } from "@/store/services/campaigns/feeStructureApi";

const FeeStructureForm = ({
  propertyFee,
  feeStructureId,
}: ICampaignFeeFormProps) => {
  const [updateFeeStructure, { isLoading }] = useUpdateFeeStructureMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: propertyFee,
  });

  const handleSubmitFeeStructure: SubmitHandler<
    ICampaignFeeFormProps["propertyFee"]
  > = async (formData) => {
    await updateFeeStructure({
      feeStructureId,
      body: getDirtyFields(formData, dirtyFields),
    }).finally(() => reset(formData));
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFeeStructure)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Campaign Investment Fee Structure"
        EditButton={
          !isLoading ? (
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
          ) : (
            <Spinner />
          )
        }
      >
        {isLoading ? (
          <GridFormSkeleton />
        ) : (
          <div>
            <p className="font-bold py-2 text-[#2C3A5C] tracking-wider opacity-50">
              PROPERTY SERVICE FEE
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {PROPERTYFEEFILDSNAME.map(({ name, label }) => (
                <TextInput
                  key={nanoid()}
                  {...register(name as KEYSFORFORM, {
                    valueAsNumber: true,
                    setValueAs: (v) => parseInt(v),
                  })}
                  label={label}
                >
                  <p className="font-medium text-[12px] border-l pl-1">AED</p>
                </TextInput>
              ))}
            </div>
            <p className="font-bold py-2 text-[#2C3A5C] tracking-wider opacity-50">
              PLATFORM FEE
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {PLATFORMFEEFILDSNAME.map(({ name, label }) => (
                <TextInput
                  key={nanoid()}
                  {...register(name as KEYSFORFORM, {
                    valueAsNumber: true,
                  })}
                  label={label}
                >
                  <p className="font-medium text-[12px] border-l pl-1">AED</p>
                </TextInput>
              ))}
            </div>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default FeeStructureForm;
