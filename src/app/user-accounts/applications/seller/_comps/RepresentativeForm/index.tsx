"use client";

import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import DownloadWrapper from "@/components/DownloadWrapper";
import PhoneInput from "@/components/PhoneInput";
import { IFields, IFile, IFormData, IRepresentativeFormProps } from "./type";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import { usePatchSellerRepDetailsMutation } from "@/store/services/sellers/sellerDetailsApi";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { defaultValue } from "./utils";

const RepresentativeForm = ({ data }: IRepresentativeFormProps) => {
  const [patchDetails, { isLoading }] = usePatchSellerRepDetailsMutation();

  const [countryCode, setCountryCode] = useState<string>("");
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isDirty, dirtyFields },
  } = useForm<IFormData>({
    defaultValues: useMemo(() => defaultValue(data), [data]),
  });
  const formAccessor = watch();

  useEffect(() => {
    // setCountryCode(data?.countryCode);
    reset(defaultValue(data));
  }, [data, reset]);

  const changeHandler = (e: ChangeEvent<Element>, field: IFields) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setValue(field, target.files[0], {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = (formData: IFormData) => {
    const dirtyItems = getDirtyFields(formData, dirtyFields);

    const form = new FormData();
    if (countryCode !== data.countryCode)
      form.append("countryCode", countryCode);

    form.append("companyId", data.companyId);
    Object.keys(dirtyItems).forEach((key) => {
      const value = dirtyItems[key as keyof typeof dirtyItems];
      if (value !== undefined && value != null) {
        form.append(key, value as string);
      }
    });

    patchDetails(form);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-1 md:col-end-4 bg-white p-5 mt-5"
    >
      <Accordion
        title="Company Representative"
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
          <div className="grid md:grid-cols-2 gap-4">
            <TextInput {...register("fullLegalName")} label="Full Name" />
            <TextInput {...register("jobProfile")} label="Job Profile" />
            <TextInput {...register("officialEmail")} label="Email Address" />
            <Controller
              name="officialPhoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  countryCode={countryCode}
                  onChangeCountryCode={setCountryCode}
                  placeholder="Enter your phone number."
                  label="Phone Number"
                />
              )}
            />
            <div className="w-full">
              <DownloadWrapper
                value={
                  (formAccessor.employmentProof as IFile)?.fileName ??
                  (formAccessor.employmentProof as File)?.name
                }
                secondaryLabel="Employment Proof"
                edit={formAccessor.employmentProof}
                filePath={(formAccessor.employmentProof as IFile)?.filePath}
                placeholder="Select employment proof"
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "employmentProof")
                }
              />
            </div>
          </div>
        )}
      </Accordion>
    </form>
  );
};

export default RepresentativeForm;
