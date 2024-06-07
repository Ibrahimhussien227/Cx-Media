import GeneralTextarea from "@/components/GeneralTextarea";
import FormField from "../FormSelectField";
import { COUNTRYOPTIONS } from "./config";
import { IBackgroundFormProps, fieldNames } from "./type";
import { investorFilterDropdown } from "../utils";
import { useCallback } from "react";

const BackgroundForm = ({
  hookForm,
  isLoading,
  applicationCompleted,
  investorDropdown,
}: IBackgroundFormProps) => {
  const formAccessor = hookForm.watch();

  const handleSelectChange = (
    fieldName: fieldNames,
    selectedOption: IOption
  ) => {
    hookForm.setValue(fieldName, selectedOption.value, {
      shouldDirty: true,
    });
  };

  const {
    investmentsExperience,
    socialStatus,
    employmentStatus,
    countryOfEmployment,
    employmentIndustry,
    annualSalaryRange,
  } = formAccessor;

  const filterValue = useCallback(
    (key: string, value: string) => {
      return investorFilterDropdown(investorDropdown, key).find(
        (level) => level.value === value
      );
    },
    [investorDropdown]
  );

  return (
    <div className="h-full overflow-auto pb-[300px]">
      <div className="text-[11px] text-[#93A0C3] tracking-[1.5px] mb-5">
        The following fields are optional.
      </div>

      <FormField
        isLoading={isLoading || applicationCompleted}
        label="INVESTMENT EXPERIENCE"
        selectValue={
          filterValue("investmentExperience", investmentsExperience) || ""
        }
        options={
          investorFilterDropdown(investorDropdown, "investmentExperience") || []
        }
        onChange={(selectedOption) =>
          handleSelectChange("investmentsExperience", selectedOption)
        }
        description="Select an option from the list that best categorizes your experience
            as an investor."
      />

      <FormField
        isLoading={isLoading || applicationCompleted}
        label="SOCIAL STATUS"
        selectValue={filterValue("investorSocialStatus", socialStatus) || ""}
        options={
          investorFilterDropdown(investorDropdown, "investorSocialStatus") || []
        }
        onChange={(selectedOption) =>
          handleSelectChange("socialStatus", selectedOption)
        }
        description="Select an option from the list that best categorizes your social
            status."
      />

      <FormField
        isLoading={isLoading || applicationCompleted}
        label="EMPLOYMENT STATUS"
        selectValue={
          filterValue("investorEmploymentStatus", employmentStatus) || ""
        }
        options={
          investorFilterDropdown(
            investorDropdown,
            "investorEmploymentStatus"
          ) || []
        }
        onChange={(selectedOption) =>
          handleSelectChange("employmentStatus", selectedOption)
        }
        description="Select an option from the list that best categorizes your employment
            status."
      />

      {investmentsExperience &&
        socialStatus &&
        employmentStatus &&
        ["EMPLOYED", "SELF_EMPLOYED"].includes(employmentStatus) && (
          <>
            <FormField
              isLoading={isLoading || applicationCompleted}
              register={{
                ...hookForm.register("employerName"),
              }}
              label="EMPLOYER/COMPANY NAME"
              placeholder="Place Company Name"
              description="Enter the full legal name of your employer/company"
            />

            <div className="w-full flex flex-row mt-5 gap-5">
              <div className="w-[25%] text-[13px] text-[#5A6A93] font-semibold tracking-[1.5px]">
                COMPANY ADDRESS
              </div>
              <div className="w-[25%]">
                <GeneralTextarea
                  readOnly={isLoading || applicationCompleted}
                  placeholder="Apartment/House Number, Building Name Street Name Area, City Country"
                  {...hookForm.register("employerAddress")}
                />
              </div>
              <p className="w-[35%] text-[#93A0C3] text-[12px] tracking-[0px] border-l py-1 pl-4">
                Enter the full company address as it appears on the valid
                company trade license.
              </p>
            </div>

            <FormField
              withSearch
              isLoading={isLoading || applicationCompleted}
              label="COUNTRY OF EMPLOYMENT"
              selectValue={COUNTRYOPTIONS.find(
                (level) => level.value === countryOfEmployment
              )}
              options={COUNTRYOPTIONS}
              onChange={(selectedOption) =>
                handleSelectChange("countryOfEmployment", selectedOption)
              }
              description="Select the country where you are currently employed."
            />

            <FormField
              register={{ ...hookForm.register("jobTitle") }}
              isLoading={isLoading || applicationCompleted}
              label="YOUR JOB TITLE"
              placeholder="Job Title"
              description="Enter the job title that you currently hold in the company."
            />

            <FormField
              withSearch
              isLoading={isLoading || applicationCompleted}
              label="INDUSTRY"
              selectValue={
                filterValue("investorEmploymentIndustry", employmentIndustry) ||
                ""
              }
              options={
                investorFilterDropdown(
                  investorDropdown,
                  "investorEmploymentIndustry"
                ) || []
              }
              onChange={(selectedOption) =>
                handleSelectChange("employmentIndustry", selectedOption)
              }
              description="Select the industry that is best associated with the operations of
            your company."
            />
            <FormField
              isLoading={isLoading || applicationCompleted}
              label="ANNUAL SALARY RANGE"
              selectValue={
                filterValue("investorAnnualSalaryRange", annualSalaryRange) ||
                ""
              }
              options={
                investorFilterDropdown(
                  investorDropdown,
                  "investorAnnualSalaryRange"
                ) || []
              }
              onChange={(selectedOption) =>
                handleSelectChange("annualSalaryRange", selectedOption)
              }
              description="Select the option from the list that is closest to your annual salary range."
            />
          </>
        )}
    </div>
  );
};

export default BackgroundForm;
