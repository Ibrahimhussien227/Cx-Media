"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import TextInput from "@/components/TextInput";
import { getDirtyFields } from "@/utils/getDirtyFields";
import { IBackgroundProps, IFormData } from "./type";
import {
  COUNTRYOPTIONS,
  EMPLOYMENTOPTIONS,
  EXPERIENCEOPTIONS,
  INDUSTRYOPTIONS,
  SALARYOPTIONS,
  SOCIALSTATUSOPTIONS,
  cities,
} from "./configs";
import { defaultValue } from "./utils";
import { useUpdateInvestorMutation } from "@/store/services/investors/investorDetailsApi";
import { calcDirtyFields } from "@/utils/getFormStatus";
import Spinner from "@/components/Spinner";
import GridFormSkeleton from "@/components/Skeleton/GridFormSkeleton";

const BackgroundForm = ({ data, investorId }: IBackgroundProps) => {
  const [updateInvestor, { isLoading }] = useUpdateInvestorMutation();
  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: defaultValue(data),
  });
  const formAccessor = watch();
  const formStatus = calcDirtyFields(formAccessor);

  useEffect(() => {
    reset(defaultValue(data));
  }, [data, reset]);

  const onSubmit = async (data: IFormData) => {
    const dirtyItems = getDirtyFields(data, dirtyFields);
    const form = new FormData();

    form.append("investorId", investorId);
    form.append("isEmploymentUpdate", "true");
    Object.keys(dirtyItems).forEach((key) => {
      const value = dirtyItems[key as keyof typeof dirtyItems];
      if (value !== undefined) {
        form.append(key, value);
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
        title="Investor Background"
        status={
          formStatus ? (formStatus == 10 ? "COMPLETE" : "INCOMPLETE") : ""
        }
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
                label="Investment Experience"
                options={EXPERIENCEOPTIONS}
                value={formAccessor.investmentsExperience}
                onChange={(selectedCountry) =>
                  setValue("investmentsExperience", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Social Status"
                options={SOCIALSTATUSOPTIONS}
                value={formAccessor.socialStatus}
                onChange={(selectedCountry) =>
                  setValue("socialStatus", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Credit Risk"
                options={COUNTRYOPTIONS}
                value={formAccessor.creditRisk}
                onChange={(selectedCountry) =>
                  setValue("creditRisk", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Employment Status"
                options={EMPLOYMENTOPTIONS}
                value={formAccessor.employmentStatus}
                onChange={(selectedCountry) =>
                  setValue("employmentStatus", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput {...register("employerName")} label="company Name" />
              <TextInput
                {...register("employerAddress")}
                label="company Address"
              />
              <CustomSelect
                className="pl-2"
                label="Country Of Employment"
                options={COUNTRYOPTIONS}
                value={formAccessor.countryOfEmployment}
                onChange={(selectedCountry) =>
                  setValue("countryOfEmployment", selectedCountry.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Your Job Title"
                options={cities}
                value={formAccessor.jobTitle}
                onChange={(selectedCity) =>
                  setValue("jobTitle", selectedCity.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Industry"
                options={INDUSTRYOPTIONS}
                value={formAccessor.employmentIndustry}
                onChange={(selectedArea) =>
                  setValue("employmentIndustry", selectedArea.value, {
                    shouldDirty: true,
                  })
                }
              />
              <CustomSelect
                className="pl-2"
                label="Annual Salary Range"
                options={SALARYOPTIONS}
                value={formAccessor.annualSalaryRange}
                onChange={(selectedArea) =>
                  setValue("annualSalaryRange", selectedArea.value, {
                    shouldDirty: true,
                  })
                }
              />
            </div>
          </>
        )}
      </Accordion>
    </form>
  );
};

export default BackgroundForm;
