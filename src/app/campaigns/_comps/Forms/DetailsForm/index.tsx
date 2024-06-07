"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomSelect from "@/components/CustomSelect";
import Spinner from "@/components/Spinner";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { useGetConfig } from "@/hooks/services/campaign/getConfig";
import { useUpdateAssetGeneralDataMutation } from "@/store/services/campaigns/assetDetailsApi";
import { IDetailsFormProps, IDetailSubmitForm } from "./type";

const DetailsForm = ({ propertyDetails, campaignId }: IDetailsFormProps) => {
  const { configData: propertyType, isLoading: isLoadingPropertyType } =
    useGetConfig("asset_type");
  const { configData: investmentType, isLoading: isLoadingIvestmentType } =
    useGetConfig("investment_type");
  const [editAssetDetails, { isLoading }] = useUpdateAssetGeneralDataMutation();

  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      assetAppId: propertyDetails.assetAppId,
      assetName: propertyDetails.name,
      assetInvestmentType: propertyDetails.investmentType,
      assetType: propertyDetails.propertyType,
      assetArea: propertyDetails.area,
      numberOfBed: propertyDetails.noOfBed,
      numberOfBath: propertyDetails.noOfBath,
      assetDescription: propertyDetails.description,
    },
  });

  useEffect(() => {
    reset({
      assetAppId: propertyDetails.assetAppId,
      assetName: propertyDetails.name,
      assetInvestmentType: propertyDetails.investmentType,
      assetType: propertyDetails.propertyType,
      assetArea: propertyDetails.area,
      numberOfBed: propertyDetails.noOfBed,
      numberOfBath: propertyDetails.noOfBath,
      assetDescription: propertyDetails.description,
    });
  }, [propertyDetails, reset]);

  const handleSubmitComapny: SubmitHandler<IDetailSubmitForm> = async (
    formData
  ) => {
    await editAssetDetails({
      campaignId,
      body: getDirtyFields(formData, dirtyFields),
      assetId: propertyDetails._id,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Overview"
        status={propertyDetails.completionStatus}
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
        {isLoadingIvestmentType || isLoadingPropertyType ? (
          <GridFormSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                {...register("assetName")}
                label="Property Name"
                disabled={isLoading}
              />
              <TextInput
                {...register("assetAppId")}
                label="Property ID"
                disabled={isLoading}
              />
              <CustomSelect
                label="Property Type"
                options={propertyType ?? []}
                value={watch("assetType")}
                disabled={isLoading}
                onChange={(selectedPropertyType) =>
                  setValue("assetType", selectedPropertyType.display, {
                    shouldDirty: true,
                  })
                }
              />
              <div className="grid md:grid-cols-2 gap-2">
                <TextInput
                  {...register("numberOfBed")}
                  label="No. of Bed"
                  disabled={isLoading}
                />
                <TextInput
                  {...register("numberOfBath")}
                  label="No. of Bath"
                  disabled={isLoading}
                />
              </div>
              <CustomSelect
                label="Investment Type"
                options={investmentType ?? []}
                value={watch("assetInvestmentType")}
                disabled={isLoading}
                onChange={(selectedInvestmentType) =>
                  setValue("assetInvestmentType", selectedInvestmentType.value)
                }
              />
              <TextInput
                {...register("assetArea", {
                  setValueAs: (v) => parseInt(v),
                })}
                label="Property Area (Sq. Ft.)"
                disabled={isLoading}
              />
            </div>
            <div className="grid md:grid-cols-1 gap-4">
              <TextInput
                {...register("assetDescription")}
                label="Property Description"
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default DetailsForm;
