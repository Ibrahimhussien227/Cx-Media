"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { UseFormReturn, useForm } from "react-hook-form";

import CustomButton from "@/components/CustomButton";
import { ArrowRight } from "@/utils/icons";
import ResidenceForm from "./ResidenceForm";
import FundsForm from "./FundsForm";
import WealthForm from "./WealthForm";
import BackgroudForm from "./BackgroundForm";
import { IFormSectionProps, SubmitType } from "./type";
import { IFormPropsWealth } from "./WealthForm/type";
import { IFormPropsFunds } from "./FundsForm/type";
import { IFormPropsResidence } from "./ResidenceForm/type";
import { countNonEmptyValues, getDefaultValues, handleFormData } from "./utils";
import { IFormBackgroundProps } from "./BackgroundForm/type";
import { SubmitForm } from "./actions";
import FormPrompt from "./FormPrompt";
import {
  BACKGROUNDKEYS,
  FUNDSKEYS,
  FUNDSKEYSOTHER,
  RESIDENCEKEYS,
  RESIDENCEKEYSOTHER,
  WEALTHKEYS,
} from "./configs";
import { VALIDFUNDSKEYS } from "./FundsForm/configs";
import { VALIDRESDKEYS } from "./ResidenceForm/configs";

const FormSection = ({
  step,
  statusHandler,
  data,
  investorDropdown,
}: IFormSectionProps) => {
  const applicationCompleted = data?.profileCompletionStatus === "COMPLETE";

  const [isLoading, setIsLoading] = useState(false);
  const applicationForm = useForm({
    defaultValues: getDefaultValues(data),
  });

  const formAccessorApplication = applicationForm.watch();

  useEffect(() => {
    const validateResidenceType = VALIDRESDKEYS?.includes(
      formAccessorApplication?.residenceType
    );
    const residenceLen = countNonEmptyValues(
      formAccessorApplication,
      validateResidenceType ? RESIDENCEKEYSOTHER : RESIDENCEKEYS
    );
    const validateFundsType = VALIDFUNDSKEYS?.includes(
      formAccessorApplication?.sourceOfFunds
    );
    const fundsLen = countNonEmptyValues(
      formAccessorApplication,
      validateFundsType ? FUNDSKEYSOTHER : FUNDSKEYS
    );

    const wealthLen = countNonEmptyValues(formAccessorApplication, WEALTHKEYS);
    const backgroundLen = countNonEmptyValues(
      formAccessorApplication,
      BACKGROUNDKEYS
    );

    statusHandler(
      { residenceLen: residenceLen, max: validateResidenceType ? 4 : 6 },
      { fundsLen: fundsLen, max: validateFundsType ? 3 : 2 },
      { wealthLen: wealthLen, max: 1 },
      backgroundLen
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formAccessorApplication]);

  useEffect(() => {
    setIsLoading(true);
    applicationForm.reset(getDefaultValues(data));

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onSubmit(data: SubmitType) {
    setIsLoading(true);

    SubmitForm(handleFormData(data, applicationForm.formState.dirtyFields));
  }

  const isLoadingStats = useMemo(
    () => isLoading || applicationForm.formState.isDirty,
    [isLoading, applicationForm.formState]
  );

  return (
    <form
      onSubmit={applicationForm.handleSubmit(onSubmit)}
      className={`w-full relative ${
        isLoading && "opacity-50"
      } transition-opacity ease-in-out duration-700`}
    >
      <FormPrompt
        hasUnsavedChanges={applicationForm.formState.isDirty}
        message="Changes you made may not be saved."
      />
      {!applicationCompleted ||
      Object.keys(applicationForm.formState.dirtyFields).some((key) =>
        BACKGROUNDKEYS.includes(key)
      ) ? (
        <CustomButton
          disabled={!isLoadingStats}
          className={`absolute -top-[75px] right-0 bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] transition-opacity ease-in-out duration-1000 ${
            !isLoadingStats ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          type="submit"
        >
          SAVE CHANGES
        </CustomButton>
      ) : (
        <Link
          className={`absolute -top-[75px] right-0 bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-sm ${
            isLoading && "opacity-50"
          }`}
          href="/profile/verify/identity"
        >
          NEXT
          <ArrowRight className="ml-1" size={18} />
        </Link>
      )}
      {/* form content */}
      {data && (
        <div className="w-full h-full overflow-hidden">
          {step === 1 && (
            <ResidenceForm
              investorDropdown={investorDropdown}
              applicationCompleted={applicationCompleted}
              isLoading={isLoading}
              hookForm={
                applicationForm as unknown as UseFormReturn<IFormPropsResidence>
              }
            />
          )}
          {step === 2 && (
            <FundsForm
              investorDropdown={investorDropdown}
              applicationCompleted={applicationCompleted}
              isLoading={isLoading}
              hookForm={
                applicationForm as unknown as UseFormReturn<IFormPropsFunds>
              }
            />
          )}
          {step === 3 && (
            <WealthForm
              investorDropdown={investorDropdown}
              applicationCompleted={applicationCompleted}
              isLoading={isLoading}
              hookForm={
                applicationForm as unknown as UseFormReturn<IFormPropsWealth>
              }
            />
          )}
          {step === 4 && (
            <BackgroudForm
              investorDropdown={investorDropdown}
              applicationCompleted={data.applicationStatus !== "PENDING"}
              isLoading={isLoading}
              hookForm={
                applicationForm as unknown as UseFormReturn<IFormBackgroundProps>
              }
            />
          )}
        </div>
      )}
    </form>
  );
};

export default FormSection;
