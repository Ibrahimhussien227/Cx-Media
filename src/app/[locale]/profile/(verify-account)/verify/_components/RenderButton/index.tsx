import Link from "next/link";

import { INVESTOR_APPLICATION_STATUS } from "@/types/enum.constants";

const RenderButton = (
  applicationStatus: string,
  kycStatus: string,
  profileStatus: string
) => {
  switch (applicationStatus) {
    case INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED:
      return (
        <Link
          href="/profile/verify/review"
          className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
        >
          UPDATE
        </Link>
      );

    case INVESTOR_APPLICATION_STATUS.UNDER_REVIEW:
      return (
        <Link
          href="/profile/verify/review"
          className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
        >
          VIEW
        </Link>
      );

    case INVESTOR_APPLICATION_STATUS.DRAFT:
      return (
        <Link
          href="/profile/verify"
          className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
        >
          CONTINUE
        </Link>
      );

    case "INCOMPLETE":
      if (kycStatus !== "ACCEPTED" && profileStatus === "COMPLETE") {
        return (
          <Link
            href="/profile/verify/identity"
            className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
          >
            CONTINUE
          </Link>
        );
      }
      break;

    case "PENDING":
      return (
        <Link
          href="/profile/verify"
          className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
        >
          START
        </Link>
      );

    default:
      return;
  }
};

export default RenderButton;
