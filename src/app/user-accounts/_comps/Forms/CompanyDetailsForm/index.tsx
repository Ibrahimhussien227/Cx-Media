"use client";

import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import TextInput from "@/components/TextInput";
import CustomSelect from "@/components/CustomSelect";
import DownloadWrapper from "@/components/DownloadWrapper";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";
import Spinner from "@/components/Spinner";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { usePatchSellerCompDetailsMutation } from "@/store/services/sellers/sellerDetailsApi";
import { ICompanyDetailsProps, IFields, IFile, IFormProps } from "./type";
import { countryOptions } from "./configs";
import { defaultValue } from "./utils";

const CompanyDetailsForm = ({ data }: ICompanyDetailsProps) => {
  const [patchDetails, { isLoading }] = usePatchSellerCompDetailsMutation();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, dirtyFields },
  } = useForm<IFormProps>({
    defaultValues: useMemo(() => defaultValue(data), [data]),
  });
  const { taxCertificateFile, tradeLicenseFile, country, city } = watch();

  useEffect(() => {
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

  const onSubmit = (formData: IFormProps) => {
    const dirtyItems = getDirtyFields(formData, dirtyFields);

    const form = new FormData();
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
      className="col-start-1 md:col-end-4 bg-white p-5 mt-5 mb-[100px]"
    >
      <Accordion
        title="Company Details"
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
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput {...register("companyName")} label="Company Name" />
              <TextInput
                {...register("numOfEmployees")}
                label="No. of Employees"
              />
              <TextInput {...register("companyTaxId")} label="Tax ID" />
              <div className="w-full">
                <DownloadWrapper
                  value={
                    (taxCertificateFile as IFile)?.fileName ??
                    (taxCertificateFile as File)?.name
                  }
                  secondaryLabel="Tax Certificate"
                  edit={taxCertificateFile}
                  filePath={(taxCertificateFile as IFile)?.filePath}
                  placeholder="Select Certificate"
                  onChange={(e: ChangeEvent) =>
                    changeHandler(e, "taxCertificateFile")
                  }
                />
              </div>
              <div className="w-full">
                <DownloadWrapper
                  value={
                    (tradeLicenseFile as IFile)?.fileName ??
                    (tradeLicenseFile as File)?.name
                  }
                  secondaryLabel="Registration/trade License"
                  edit={tradeLicenseFile}
                  filePath={(tradeLicenseFile as IFile)?.filePath}
                  placeholder="Select License"
                  onChange={(e: ChangeEvent) =>
                    changeHandler(e, "tradeLicenseFile")
                  }
                />
              </div>
            </div>

            <div className="pt-2 flex flex-row items-center">
              <span className="capitalize text-[14px] font-medium min-w-[140px]">
                Company Address
              </span>
              <span className="w-full h-[1px] bg-[#D4E4F2]" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                label="Address Line 1"
                {...register("companyAddress_1")}
              />
              <TextInput
                label="Address Line 2"
                {...register("companyAddress_2")}
              />
              <TextInput label="Postal Code" {...register("postalCode")} />
              <CustomSelect
                className="pl-2"
                label="Country"
                options={countryOptions}
                value={country}
                onChange={(selectedCountry) =>
                  setValue("country", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="py-[7px]"
                label="City"
                options={countryOptions}
                value={city}
                onChange={(selectedCity) => {
                  setValue("city", selectedCity.value, { shouldDirty: true });
                }}
              />
            </div>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default CompanyDetailsForm;
