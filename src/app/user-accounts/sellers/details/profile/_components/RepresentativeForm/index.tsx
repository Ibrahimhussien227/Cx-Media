"use client";

import React, { ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import CustomSelect from "@/components/CustomSelect";
import { countryOptions } from "./config";
import DownloadWrapper from "@/components/DownloadWrapper";
import PhoneInput from "@/components/PhoneInput";
import { IFields, IFile, IFormProps, IRepresentativeFormProps } from "./type";

import { getDirtyFields } from "@/utils/getDirtyFields";
import { usePatchSellerRepDetailsMutation } from "@/store/services/sellers/sellerDetailsApi";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const RepresentativeForm = ({ data }: IRepresentativeFormProps) => {
  const [patchDetails, { isLoading }] = usePatchSellerRepDetailsMutation();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isDirty, dirtyFields },
  } = useForm<IFormProps>({
    defaultValues: {
      fullLegalName: data?.name,
      jobProfile: data?.jobProfile,
      officialEmail: data?.email,
      KYCstatus: data?.kycStatus,
      officialPhoneNumber: data?.phoneNumber,
      employmentProofFile: {
        fileName: data?.employmentProof?.fileName,
        filePath: data?.employmentProof?.filePath,
      },
      countryCode: data?.countryCode,
    },
  });
  const { KYCstatus, employmentProofFile, countryCode } = watch();

  useEffect(() => {
    reset({
      fullLegalName: data?.name,
      jobProfile: data?.jobProfile,
      officialEmail: data?.email,
      KYCstatus: data?.kycStatus,
      officialPhoneNumber: data?.phoneNumber,
      employmentProofFile: {
        fileName: data?.employmentProof?.fileName,
        filePath: data?.employmentProof?.filePath,
      },
      countryCode: data?.countryCode,
    });
  }, [data, reset]);

  const changeHandler = (e: ChangeEvent<Element>, field: IFields) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setValue(field, target.files[0], {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = (formData: IFormProps) => {
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
            <CustomSelect
              className="py-[7px]"
              label="KYC Status"
              options={countryOptions}
              value={KYCstatus}
              onChange={(option) => {
                setValue("KYCstatus", option.value, { shouldDirty: true });
              }}
            />
            <Controller
              name="officialPhoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  countryCode={countryCode}
                  onChangeCountryCode={(value: string) =>
                    setValue("countryCode", value, {
                      shouldDirty: true,
                    })
                  }
                  placeholder="Enter your phone number."
                  label="Phone Number"
                />
              )}
            />
            <div className="w-full">
              <DownloadWrapper
                value={
                  (employmentProofFile as IFile)?.fileName ??
                  (employmentProofFile as File)?.name
                }
                secondaryLabel="Employment Proof"
                edit={employmentProofFile}
                filePath={(employmentProofFile as IFile)?.filePath}
                placeholder="Select employment proof"
                onChange={(e: ChangeEvent) =>
                  changeHandler(e, "employmentProofFile")
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
