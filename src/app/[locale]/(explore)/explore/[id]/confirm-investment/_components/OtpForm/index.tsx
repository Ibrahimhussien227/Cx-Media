"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import useOTP from "@/hooks/auth/useOTP";
import CustomButton from "@/components/CustomButton";
import OtpInput from "@/components/OtpInput";
import { CaretLeft } from "@/utils/icons";
import ResendOtp from "./ResendOtp";
import { UserSchema } from "./validation";
import { IOtpFormCode } from "./type";

const OTPForm = ({ searchParams }: ISearchParamsProps) => {
  // const { verifyEmail, isLoading, isSuccess, error } = useOTP();

  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(UserSchema),
  });

  /**
   * Handles the verification of email using the provided form data.
   * @param formData The data submitted in the OTP form.
   */
  const handleVerifyEmail: SubmitHandler<IOtpFormCode> = async () => {
    params.set("auth", "true");
    // verifyEmail(formData);
    // sessionStorage.removeItem("otpCounter");
    router.replace(`?${params}`);
  };

  return (
    <div className="flex flex-col gap-y-4 text-center items-center justify-center my-5 h-full">
      <Link
        href={`?count=${searchParams.count}`}
        className="flex w-[70%] items-start cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center text-center rounded-full bg-white border">
          <CaretLeft size={14} />
        </div>
      </Link>
      <p className="text-[26px] font-MinionPro tracking-[0px]">
        {/* {CONTENT[indexer]?.title} */}
        Authorize Transaction.
      </p>
      <div className="w-[30px] h-[2px] bg-active" />
      <p className="text-[12px] text-secondary w-[75%]">
        {/* {CONTENT[indexer]?.content}
         */}
        Please enter the OTP sent to your registered email to authorize this
        transaction.
      </p>
      <form
        onSubmit={handleSubmit(handleVerifyEmail)}
        className="flex flex-col justify-center items-center"
      >
        {/* {error && <p className="text-xs font-ligh text-red-500">{error}</p>} */}

        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange } }) => (
            <OtpInput
              onChange={onChange}
              isDisabled={!isDirty}
              errors={errors.otp?.message}
            />
          )}
        />
        <CustomButton
          type="submit"
          className={`mt-4 w-full py-2 bg-active text-white flex items-center justify-center text-[10px] rounded-sm ${
            !isDirty
              ? "opacity-50"
              : "hover:bg-[#341341] transition-all delay-100"
          }`}
          disabled={!isDirty}
          // isLoading={isSuccess || isLoading}
        >
          PROCEEED
        </CustomButton>
        <ResendOtp />
      </form>
    </div>
  );
};

export default OTPForm;
