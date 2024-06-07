import React, { useRef, useState } from "react";

import { IOtpInput } from "./type";

const OtpInput = ({ ...props }: IOtpInput) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const otpBoxReference = useRef(new Array(6));

  function handleChange(value: string, index: number) {
    const newValue = value.replace(/\D/g, "");

    const newArr = [...otp];
    newArr[index] = newValue;
    setOtp(newArr);

    props.onChange(newArr.join(""));

    if (value && index < 6 - 1 && !isNaN(parseFloat(value))) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace" && !target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && target.value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  return (
    <div className="flex flex-col items-start">
      <p className="text-[10px] text-secondary font-bold ml-4">OTP</p>

      <div className="flex items-center justify-center gap-2">
        {[...Array(6)].map((digit, index) => (
          <input
            key={index}
            value={otp[index]}
            maxLength={1}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            className="border w-[50px] h-[50px] p-3 rounded-sm block bg-white focus:outline-none focus:bg-[#F5FAFF] focus:border-active text-center"
          />
        ))}
      </div>
      <p className="text-xs font-light py-2 h-2 text-red-600 uppercase">
        {props.errors}
      </p>
    </div>
  );
};

export default OtpInput;
