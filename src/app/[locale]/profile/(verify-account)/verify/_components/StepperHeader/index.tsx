"use client";

import { usePathname, useRouter } from "next/navigation";

// import { CheckCircle, WarningCircle } from "@/utils/icons";
import {
  INVESTOR_APPLICATION_STATUS,
  KYCStatusEnum,
} from "@/types/enum.constants";
import { IStepperHeaderProps } from "./type";
import RenderIcon from "./RenderStep";

const StepperHeader = ({
  kycStatus,
  profileCompletionStatus,
  applicationStatus,
}: IStepperHeaderProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const completedKyc = KYCStatusEnum.ACCEPTED === kycStatus;

  const completeInvestorProfile =
    INVESTOR_APPLICATION_STATUS.COMPLETE === profileCompletionStatus;

  const changeUrl = (href: string) => {
    switch (href) {
      case "":
        router.replace("/profile/verify");
        break;
      case "identity":
        completeInvestorProfile && router.replace("/profile/verify/identity");
        break;
      case "review":
        completedKyc && router.replace("/profile/verify/review");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row items-center justify-between border-b pt-5 px-8">
      {/* left */}
      <div className="flex flex-row justify-start gap-8">
        <div
          className={`pt-2 pb-3 w-fit ${
            pathName == "/profile/verify"
              ? "border-b-[2px] border-[#FF6C02]"
              : "opacity-50"
          }`}
        >
          <div
            onClick={() => changeUrl("")}
            className="flex flex-row items-center w-fit border rounded-3xl px-3 py-[3px] font-semibold text-[#5A6A93] bg-[#F5FAFF] text-[11px] tracking-[1.2px] cursor-pointer"
          >
            1. INVESTOR PROFILE
            {RenderIcon(profileCompletionStatus)}
          </div>
        </div>
        <div
          className={`pt-2 pb-3 w-fit 
          ${
            pathName.includes("identity")
              ? "border-b-[2px] border-[#FF6C02]"
              : "opacity-50"
          }`}
        >
          <div
            onClick={() => changeUrl("identity")}
            className={`flex flex-row items-center w-fit border rounded-3xl px-3 py-[3px] font-semibold text-[#5A6A93] bg-[#F5FAFF] text-[11px] tracking-[1.2px] ${
              completedKyc && "cursor-pointer"
            }`}
          >
            2. IDENTITY VERIFICATION
            {RenderIcon(kycStatus)}
          </div>
        </div>
        <div
          className={`pt-2 pb-3 w-fit  
          ${
            pathName.includes("review")
              ? "border-b-[2px] border-[#FF6C02]"
              : "opacity-50"
          }`}
        >
          <div
            onClick={() => changeUrl("review")}
            className={`flex flex-row items-center w-fit border rounded-3xl px-3 py-[3px] font-semibold text-[#5A6A93] bg-[#F5FAFF] text-[11px] tracking-[1.2px] ${
              completedKyc && "cursor-pointer"
            }`}
          >
            3. APPLICATION REVIEW
            {RenderIcon(applicationStatus)}
          </div>
        </div>
      </div>
      {/* Right */}
      {/* BUTTON SHADOW (DON'T DELETE) */}
      <div className="bg-[black] opacity-0 text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]">
        {pathName.includes("identity") ? "NEXT" : "SAVE CHANGES"}
      </div>
    </div>
  );
};

export default StepperHeader;
