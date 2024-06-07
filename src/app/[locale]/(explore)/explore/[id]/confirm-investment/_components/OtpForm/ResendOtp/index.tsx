// import useOTPResend from "@/hooks/auth/useResendOTP";
import { Check } from "@/utils/icons";
import React, { useEffect, useState } from "react";

const ResendOtp = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [resend, setResend] = useState<boolean>(false);

  const formatSeconds = seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  useEffect(() => {
    setSeconds(parseInt(sessionStorage.getItem("otpCounter") || "60", 10));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds > 0 ? prevSeconds - 1 : 0;
        if (newSeconds === 0) {
          clearInterval(interval); // Stop the timer when it reaches 0
          // setResend(false);
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const saveOTPCouner = () => {
      if (resend === true) {
        setResend(false);
      }
      window.sessionStorage.setItem("otpCounter", JSON.stringify(seconds));
    };
    window.addEventListener("beforeunload", saveOTPCouner);
    return () => window.removeEventListener("beforeunload", saveOTPCouner);
  }, [seconds, resend]);

  const handleResendOtp = async () => {
    // resendOTP();
    setSeconds(60);
    setResend(true);
  };

  return (
    <div className="w-full flex flex-row justify-between mt-4">
      <p className=" text-blue-500 text-[12px]">
        00:
        {formatSeconds}
      </p>
      {resend ? (
        <div className="flex flex-row gap-1 items-center">
          <Check color="#12EF90" size={12} />
          <p className="text-[12px] text-secondary">OTP Sent. Check inbox.</p>
        </div>
      ) : (
        <div className="text-[12px] flex flex-row gap-1">
          <p className="text-secondary tracking-wide">
            {`didn't receive an OTP?`}
          </p>
          <button
            type="button"
            disabled={seconds !== 0}
            className={`tracking-wide ${
              seconds == 0 ? "text-blue-500" : "text-[#D4E4F2]"
            }`}
            onClick={handleResendOtp}
          >
            Resend OTP.
          </button>
        </div>
      )}
    </div>
  );
};

export default ResendOtp;
