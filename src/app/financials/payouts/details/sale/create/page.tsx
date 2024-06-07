"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import CustomDatePicker from "@/components/CustomDatePicker";
import TextInput from "@/components/TextInput";
import SuccessModal from "@/components/Modal/SuccessModal";
import { ArrowLeft, Check } from "@/utils/icons";
import ReviewSummary from "../../_components/ReviewSummary";
import StepButtons from "../../_components/StepButtons";
import { COLUMNS } from "../configs";
import { IFormData } from "./type";
import { PAYOUTLOGSHEADER } from "./configs";

const CreateSale = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      grossSoldValue: "",
      maintenanceAdditionalCost: "",
      comments: "",
      disbursementDate: "",
    },
  });

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(1);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const onSubmit = (data: IFormData) => {
    console.log(data);
    setShowModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center px-5 py-2 mt-5 text-[18px]">
          <Link
            className="flex flex-row items-center mr-2 cursor-pointer"
            href="."
          >
            <ArrowLeft size={20} className="mr-2 mt-1" />
            <span className="font-medium text-[#555555]">Payouts |</span>
          </Link>
          <span className="font-bold text-primary tracking-wide">
            Create Property Sale Payout
          </span>
        </div>
        <div className="flex flex-row justify-between mt-4 mx-5 px-5 py-4 bg-white">
          <div className="flex flex-row items-center ">
            <div>
              {step == 1 ? (
                <span className="p-1 px-2 mr-2 font-semibold border">1</span>
              ) : (
                <Check className="w-[24px] h-[25px] mr-2 p-[2px] bg-[#2C3A5C] text-white font-boldest inline-block" />
              )}
              <span className="font-bold text-primary tracking-wide">
                Payout Details
              </span>
            </div>
            <div className="w-[130px] h-[1px] bg-[#ccc] mx-3" />
            <div className={`${step != 2 && "opacity-40"}`}>
              <span className="p-1 px-2 mr-2 bg-[#F5F8FF80] font-semibold border">
                2
              </span>
              <span className="font-bold text-primary tracking-wide">
                Review Summary
              </span>
            </div>
          </div>
          <div className={`flex flex-row gap-3 w-[230px]`}>
            <StepButtons
              step={step}
              isDirty={isDirty}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </div>
        </div>
        {step == 1 && (
          <div className="bg-white w-[50%] p-4 mx-5 mt-5">
            <p className="font-bold text-primary tracking-wide whitespace-nowrap px-1 pb-2 mb-2 border-b">
              Create New Payout
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-100px">
              <Controller
                control={control}
                name="disbursementDate"
                render={({ field: { value, onChange } }) => (
                  <CustomDatePicker
                    // disabled={isLoading}
                    icon="CalendarBlank"
                    label="Disbursement Date"
                    formatString="yyyy-MM-dd"
                    onChange={onChange}
                    placeholderText="Please select a date"
                    value={value}
                  />
                )}
              />
              <TextInput
                label="Gross Sold Value"
                {...register("grossSoldValue")}
              />
              <TextInput
                label="Maintenance & Additional Cost"
                {...register("maintenanceAdditionalCost")}
              />
              <TextInput label="Comments (if any)" {...register("comments")} />
            </div>
          </div>
        )}
        {/* step 2 */}
        {step == 2 && (
          <ReviewSummary
            columns={COLUMNS}
            payoutLogsHeader={PAYOUTLOGSHEADER}
          />
        )}
      </form>

      {/* MODALS */}
      {showModal && (
        <SuccessModal
          handleClick={() => router.push(".")}
          setModalOpen={setShowModal}
          description="Payout event created Successfully."
        />
      )}
    </>
  );
};

export default CreateSale;
