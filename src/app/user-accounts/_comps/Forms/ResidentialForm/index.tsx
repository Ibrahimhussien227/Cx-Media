"use client";

import { ChangeEvent, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";
import Accordion from "@/components/Accordion";
import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";
import DownloadWrapper from "@/components/DownloadWrapper";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import Spinner from "@/components/Spinner";
import { useUpdateInvestorMutation } from "@/store/services/investors/investorDetailsApi";
import { calcDirtyFields } from "@/utils/getFormStatus";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { IField, IFormData, IResidentialProps } from "./type";
import {
  PROOFTYPEEOPTIONS,
  RESIDENCEOPTIONS,
  cities,
  COUNTRYOPTIONS,
} from "./configs";
import { defaultValue } from "./utils";

const ResidentialAddressForm = ({ data, investorId }: IResidentialProps) => {
  const [updateInvestor, { isLoading }] = useUpdateInvestorMutation();
  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: useMemo(() => defaultValue(data), [data]),
  });
  const formAccessor = watch();
  const formStatus = calcDirtyFields(formAccessor);

  useEffect(() => {
    reset(defaultValue(data));
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
    form.append("isResidenceUpdate", "true");
    Object.keys(dirtyItems).forEach((key) => {
      const value = dirtyItems[key as keyof typeof dirtyItems];
      if (value !== undefined && value != null) {
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
        title="Residential Address"
        status={formStatus ? (formStatus == 8 ? "COMPLETE" : "INCOMPLETE") : ""}
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
          <>
            <div className="grid md:grid-cols-2 gap-4 border-b pb-5">
              <CustomSelect
                className="pl-2"
                label="Residence Type"
                options={RESIDENCEOPTIONS}
                value={formAccessor.residenceType}
                onChange={(selectedCountry) =>
                  setValue("residenceType", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput {...register("addressLine1")} label="Address Line 1" />
              <CustomSelect
                className="pl-2"
                label="Country"
                options={COUNTRYOPTIONS}
                value={formAccessor.country}
                onChange={(selectedCountry) =>
                  setValue("country", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="City"
                options={cities}
                value={formAccessor.city}
                onChange={(selectedCity) =>
                  setValue("city", selectedCity.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Address Proof Type"
                options={PROOFTYPEEOPTIONS}
                value={formAccessor.addressProofType}
                onChange={(selectedArea) =>
                  setValue("addressProofType", selectedArea.value, {
                    shouldDirty: true,
                  })
                }
              />
              <DownloadWrapper
                value={
                  formAccessor.addressProofDocument?.originalname ??
                  formAccessor.addressProofDocument?.name
                }
                edit={formAccessor.addressProofDocument}
                secondaryLabel="Address Proof"
                filePath={formAccessor.addressProofDocument?.fileLink}
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "addressProofDocument")
                }
              />
              <TextInput
                {...register("friendRelativeName")}
                label="Friend / relative Name"
              />
              <DownloadWrapper
                value={
                  formAccessor.friendRelativeProofDocument?.originalname ??
                  formAccessor.friendRelativeProofDocument?.name
                }
                secondaryLabel="Friend / Relative ID"
                edit={formAccessor.addressProofDocument}
                filePath={formAccessor.friendRelativeProofDocument?.fileLink}
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "friendRelativeProofDocument")
                }
              />
            </div>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default ResidentialAddressForm;
