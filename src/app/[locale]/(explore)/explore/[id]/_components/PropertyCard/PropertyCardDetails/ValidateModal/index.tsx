"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CustomButton from "@/components/CustomButton";
import GeneralModal from "@/components/Modal";
import { useLazyAsync } from "@/hooks/useAsync";
import { validateInvestment } from "@/utils/api/investmentApi";
import { MODALS } from "./config";

const ValidateModal = ({
  count,
  campaignId,
}: {
  count: number;
  campaignId: string;
}) => {
  const [showValidateModal, setShowValidateModal] = useState(false);
  const router = useRouter();
  const [startInvestment, { data: investmentData, isLoading }] =
    useLazyAsync(validateInvestment);

  useEffect(() => {
    startInvestment({
      params: {
        campaignId: campaignId,
        requestedShares: count * 1000,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, startInvestment]);

  return (
    <>
      <CustomButton
        onClick={(e) => {
          e.preventDefault();
          if (investmentData?.SUCCESS) {
            router.push(
              `/explore/${campaignId}/confirm-investment?count=${count}`
            );
          } else {
            setShowValidateModal(true);
          }
        }}
        className="bg-active text-xs text-white text-[10px] font-bold flex flex-row gap-x-4 rounded-sm py-4 px-4 items-center justify-center"
      >
        BUY
      </CustomButton>
      {showValidateModal && !isLoading && investmentData && (
        <GeneralModal
          title={MODALS[investmentData?.type as keyof typeof MODALS]?.title}
          description={
            MODALS[investmentData?.type as keyof typeof MODALS]?.desc
          }
          setShowModal={setShowValidateModal}
          className="w-[320px]"
        >
          <CustomButton
            className="hover:bg-[#D4E4F2] transition-all delay-100 w-full py-0.5 px-2 mt-3 text-white text-[10px] tracking-[1.5px] font-medium border rounded-sm bg-[#2C3A5C]"
            onClick={() => {
              // reset();
              setShowValidateModal(false);
            }}
          >
            {MODALS[investmentData?.type as keyof typeof MODALS]?.button.cancel}
          </CustomButton>
          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              if (investmentData?.type === "BALANCE_INSUFFICIENT") {
                router.push("/profile/manage-wallet");
              } else if (investmentData?.type === "INVESTMENT_CAP_EXCEEDED") {
                router.push("/profile/manage-investment");
              } else if (
                investmentData?.type === "ACCOUNT_VERIFICATION_PENDING"
              ) {
                router.push("/profile/verify");
              }
            }}
            className="transition-all delay-100 w-full py-0.5 px-2 bg-active mt-3 text-white text-[10px] tracking-[1.5px] font-medium rounded-sm"
          >
            {MODALS[investmentData?.type as keyof typeof MODALS]?.button.submit}
          </CustomButton>
        </GeneralModal>
      )}
    </>
  );
};

export default ValidateModal;
