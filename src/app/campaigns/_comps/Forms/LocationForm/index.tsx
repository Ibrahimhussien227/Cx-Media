"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";
import Accordion from "@/components/Accordion";
import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";
import MapContainer from "@/components/MapContainer";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { useUpdateAssetLocationMutation } from "@/store/services/campaigns/assetDetailsApi";
import { ILoactionForm, ILocationSubmitForm } from "./type";

import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const LocationForm = ({ propertyLocation, campaignId }: ILoactionForm) => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      assetAddressOne: propertyLocation.assetAddressOne ?? "",
      assetAddressTwo: propertyLocation.assetAddressTwo ?? "",
      assetCountry: propertyLocation.assetCountry ?? "",
      assetCity: propertyLocation.assetCity,
      assetLocationArea: propertyLocation.assetLocationArea ?? "",
    },
  });

  console.log(propertyLocation);

  const [editAssetLoaction, { isLoading }] = useUpdateAssetLocationMutation();

  const handleSubmitComapny: SubmitHandler<ILocationSubmitForm> = async (
    formData,
  ) => {
    await editAssetLoaction({
      assetLocationId: propertyLocation.assetId,
      body: getDirtyFields(formData, dirtyFields),
      campaignId,
    });
    // registerPassword(formData, searchParams);
  };

  const { assetCity } = watch();

  console.log(assetCity);

  useEffect(() => {
    reset({
      assetAddressOne: propertyLocation.assetAddressOne,
      assetAddressTwo: propertyLocation.assetAddressTwo,
      assetCountry: propertyLocation.assetCountry,
      assetCity: propertyLocation.assetCity,
      assetLocationArea: propertyLocation.assetLocationArea,
    });
  }, [propertyLocation, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitComapny)}
      className="col-start-1 md:col-end-4 bg-white p-5"
    >
      <Accordion
        title="Location"
        status={propertyLocation.completionStatus}
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
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-100px">
              <TextInput
                {...register("assetAddressOne")}
                label="Address Line 1"
              />
              <TextInput
                {...register("assetAddressTwo")}
                label="Address Line 2 (Optional)"
              />
              <CustomSelect
                label="Country"
                options={[]}
                value={assetCity}
                onChange={(selectedInvestmentType) =>
                  setValue("assetCountry", selectedInvestmentType.value)
                }
              />
              <CustomSelect
                label="City"
                options={[]}
                value={watch("assetCity")}
                onChange={(selectedInvestmentType) =>
                  setValue("assetCity", selectedInvestmentType.value)
                }
              />
              <CustomSelect
                label="Area"
                options={[]}
                value={watch("assetLocationArea")}
                onChange={(selectedInvestmentType) =>
                  setValue("assetLocationArea", selectedInvestmentType.value)
                }
              />

              <div className="col-span-2 h-full justify-center rounded-sm px-2 py-2 ${fullWidth ? 'w-full' : ''}">
                <MapContainer
                  popupTitle={propertyLocation.assetLocationArea}
                  popupDescription={`${propertyLocation.assetAddressOne}, ${propertyLocation.assetCity}`}
                  longitude={+propertyLocation?.assetGeolocationLong}
                  latitude={+propertyLocation?.assetGeolocationLat}
                  // showPopup
                />
              </div>
            </div>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default LocationForm;
