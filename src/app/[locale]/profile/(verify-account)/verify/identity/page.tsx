"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import StatusText from "@/components/StatusText";
import CustomButton from "@/components/CustomButton";
import { useLazyAsync } from "@/hooks/useAsync";
import { KYCStatusEnum } from "@/types/enum.constants";
import { getIframe, getUseKycInfo } from "@/utils/api/kycApi";
import { ArrowRight } from "@/utils/icons";
import { formateDate } from "@/utils/formateDate";
import Loading from "@/app/[locale]/loading";
import ProfileForm from "./_components/ProfileForm";

const Identity = () => {
  const [startKyc, setStartKyc] = useState(false);

  const [StartIframe, { data: iframeData }] = useLazyAsync(getIframe);
  const [startKycInfo, { data: kycData, isLoading }] =
    useLazyAsync(getUseKycInfo);

  const verfied = kycData?.kycStatus === KYCStatusEnum.VERIFIED;

  useEffect(() => {
    startKycInfo();
  }, [startKycInfo]);

  const handleStartKyc = async () => {
    setStartKyc(true);
    if (
      !kycData?.iframeData ||
      [KYCStatusEnum.CANCELLED, KYCStatusEnum.UNVERIFIED].includes(
        kycData?.kycStatus
      )
    ) {
      await StartIframe();
    } else {
      await startKycInfo();
    }
  };

  if (isLoading) return <Loading />;

  // if (kycData && kycData.error)
  //   return <div className="text-red-500">{kycData.error.message}</div>;

  return (
    <div className="relative px-7 w-full">
      {/* submit button */}
      <Link
        href={verfied ? "/profile/verify/review" : "#"}
        className={`absolute -top-[68px] right-[32px] bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] ${
          !verfied && "opacity-50 cursor-not-allowed"
        }`}
      >
        NEXT
        <ArrowRight className="ml-1" size={18} />
      </Link>
      <div className="flex flex-row items-center justify-between w-full mt-5 border-b-[#D4E4F2] border-b-[1px]">
        <div className="flex flex-col px-[20px] pt-[10px] pb-[20px] ">
          <h2 className=" text-[20px] font-MinionPro">KYC Verification.</h2>
          <p className="text-secondary text-[12px] tracking-[0]">
            Complete your identity verification to proceed to the next step
          </p>
        </div>
        <div className="flex flex-row">
          {kycData && (
            <div className="flex flex-col items-end mr-4">
              <StatusText
                text={
                  verfied
                    ? "VERIFIED"
                    : kycData?.kycStatus?.split(".").pop()?.toUpperCase() ||
                      "PENDING"
                }
              />
              {kycData.updatedAt && (
                <p className="text-secondary text-[12px] tracking-[0] py-1">
                  Updated at {formateDate(kycData?.updatedAt)}
                </p>
              )}
            </div>
          )}
          {isLoading ? (
            <p>...Loading</p>
          ) : (
            !verfied && (
              <CustomButton
                onClick={handleStartKyc}
                className="bg-[#FF6C02] text-white text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px]"
              >
                {(kycData?.iframeData || iframeData?.result.verification_url) &&
                startKyc
                  ? "REFRESH"
                  : "START"}
              </CustomButton>
            )
          )}
        </div>
      </div>
      {(kycData?.iframeData || iframeData) && startKyc && (
        <div className="px-7 w-full my-5 flex items-center justify-center text-[#5A6A93] bg-white border h-full overflow-y-scroll no-scrollbar">
          <iframe
            src={
              kycData?.iframeData?.verification_url ||
              iframeData?.result?.verification_url
            }
            title="Open identification process"
            width="100%"
            height={500}
            allow={`camera ${
              kycData?.iframeData?.verification_url ||
              iframeData?.result?.verification_url
            }`}
          />
        </div>
      )}

      {verfied && kycData.metaData && (
        <div className="flex justify-center w-[85%] p-[25px] border-b">
          <ProfileForm kycData={kycData} />
        </div>
      )}
      <p className="px-4 w-full py-3 text-[#93A0C3] text-[12px] tracking-[0px]">
        KYC Verification is powered by ShuftiPro. At WeProperties, we maintain
        the highest levels of security when dealing with your sensitive data. To
        find out more about how we manage your data and privacy, please see our
        <span className="font-medium ml-1">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Identity;
